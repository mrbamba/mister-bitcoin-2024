import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoading$ = new BehaviorSubject<Boolean>(false)
  public isLoading$ = this._isLoading$.asObservable()

  setIsLoading(isLoading: Boolean){
    this._isLoading$.next(isLoading)
  }
}
