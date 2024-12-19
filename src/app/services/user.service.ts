import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User = {
    fullName : 'Steven Farks',
    bitcoinBalance: 100,
    _id: 'u1001',
    moves: []
  } 

  // user: User | null = null

  private _loggedInUser$ = new BehaviorSubject(this.user)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  public getUser():User | null{
    console.log('this._loggedInUser$.value: ',this._loggedInUser$.value);
    
    return this._loggedInUser$.value
  }
}
