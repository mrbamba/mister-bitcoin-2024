import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, of } from 'rxjs';
import { User } from '../models/user.models';
import { storageService } from './async-storage.service';
const ENTITY = 'user'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user?: User
  private _loggedInUser$ = new BehaviorSubject<User | undefined>(undefined);
  public loggedInUser$ = this._loggedInUser$.asObservable()
  constructor() {
    this.loadUser()
  }

  private loadUser(): void {
    from(Promise.resolve(localStorage.getItem(ENTITY)))
      .pipe(
        map((storedUser) => (storedUser ? JSON.parse(storedUser) as User : this._createUser())),
        catchError((error) => {
          console.error('Error parsing user data: ', error)
          const newUser = this._createUser()
          localStorage.setItem(ENTITY, JSON.stringify(newUser))
          return of(newUser)
        })
      )
      .subscribe((user)=>{
        this._loggedInUser$.next(user)
      })
  }

  public getUser(): User | undefined {
    return this._loggedInUser$.value
  }

  _createUser(): User {
    return {
      fullName: 'Steven Farks',
      email: 'stevenfarksallot@gmail.com',
      address: {
        street: '34 Golumb st',
        city: 'Tel aviv',
        state: 'Center',
        country: 'Israel',
        zip: '60000',
      },
      bitcoinBalance: 100,
      _id: 'u1001',
      moves: [],
      dateOfBirth: 1734687146,
      newsletterSubscription: true,
    }
  }

  logout() {
    this._loggedInUser$.next(undefined);
    localStorage.removeItem(ENTITY)
    this._loggedInUser$.next(this.user)
  }
  
  getEmptyUser(): User {
    return {
      fullName: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      },
      bitcoinBalance: 100,
      _id: '',
      moves: [],
      dateOfBirth: Date. now(),
      newsletterSubscription: true,
    }
  }

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

