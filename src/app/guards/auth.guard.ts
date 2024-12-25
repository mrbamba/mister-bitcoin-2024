import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { delay, map } from 'rxjs';
import { MsgService } from '../services/msg.service';

export const authGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService)
    const router = inject(Router)
    const msgService = inject(MsgService)

    return userService.loggedInUser$.pipe(
        map(user => {
            if (!user) {
                msgService.setErrorMsg('No authorized user!')
                
                return router.createUrlTree(['/signup'])
                }
            return true
        })
    )
};
