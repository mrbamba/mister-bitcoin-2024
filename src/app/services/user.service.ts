import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User = {
    fullName : 'Steven Farks',
    email: 'stevenfarksallot@gmail.com',
    address:{
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

  // user: User | null = null

  private _loggedInUser$ = new BehaviorSubject(this.user)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  public getUser():User | null{
    console.log('this._loggedInUser$.value: ',this._loggedInUser$.value);
    
    return this._loggedInUser$.value
  }
}

