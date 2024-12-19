import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { delay, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  router.createUrlTree(['/login'])
  
  return userService.loggedInUser$.pipe(
    delay(500),
    map(user => !!user || router.createUrlTree(['/login']))
  )
};
