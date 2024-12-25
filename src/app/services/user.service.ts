import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { storageService } from './async-storage.service';
import { utilService } from './storage.service';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
const ENTITY = 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY)!)
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify([]))
        }
    }

    private _loggedInUser$ = new BehaviorSubject<User | null>(utilService.loadFromSession(ENTITY_LOGGEDIN_USER))
    public loggedInUser$ = this._loggedInUser$.asObservable()

    public signup(name: string) {
        return from(storageService.query<User>(ENTITY)).pipe(
            map(users => users.find(_user => _user.fullName === name)),
            switchMap(user => user
                ? of(user)
                : from(storageService.post(ENTITY, this._createUser(name) as User))
            ),
            tap(user => this._saveLocalUser(user))
        )
    }
    
    public logout() {
        return of(null).pipe(
            tap(() => this._saveLocalUser(null))
        )
    }
    
    public addMove(contact: Contact, amount: number): Observable<null | any> {
        if (!amount) return of(null)

        const loggedinUser = { ...this.getLoggedInUser() }
        if ((loggedinUser.bitcoinBalance || 0) < amount) {
            return throwError(() => new Error('Not enough coins'))
        }

        const newMove = this._createMove(contact, amount)
        loggedinUser.bitcoinBalance = (loggedinUser.bitcoinBalance || 0) - amount
        loggedinUser.moves = loggedinUser.moves || [];
        loggedinUser.moves.unshift(newMove)

        if (!loggedinUser._id) {
            return throwError(() => new Error('Logged-in user ID is missing'));
        }
        if (!loggedinUser._id || !loggedinUser.fullName || loggedinUser.bitcoinBalance === undefined) {
            return throwError(() => new Error('Invalid user data'));
        }
        return from(storageService.put(ENTITY, loggedinUser as User)).pipe(
            tap(() => this._saveLocalUser(loggedinUser as User))
        );
    }

    public getLoggedInUser(): User | null {
        return this._loggedInUser$.value
    }
    
    private _createUser(name: string): Partial<User> {
        return {
            fullName: name,
            bitcoinBalance: 100,
            moves: [],
            _id: _getRandomId(),
        }
    }

    private _createMove(contact: Contact, amount: number): Move {
        return {
            toContactId: contact._id,
            toContactName: contact.name,
            timestamp: Date.now(),
            amount
        }
    }

    private _saveLocalUser(user: User | null) {
        this._loggedInUser$.next(user ? { ...user } : null);
        utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    }

    // getEmptyUser(): Partial<User> {
    //   return {
    //     fullName: '',
    //     // email: '',
    //     // address: {
    //     //   street: '',
    //     //   city: '',
    //     //   state: '',
    //     //   country: '',
    //     //   zip: '',
    //     // },
    //     bitcoinBalance: 100,
    //     // _id: '',
    //     moves: [],
    //     // dateOfBirth: Date. now(),
    //     // newsletterSubscription: true,
    //   }
    // }

}

function _getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}

