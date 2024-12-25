import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'signup-page',
  standalone: false,
  
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  private userService = inject(UserService)
  private router = inject(Router)

  userName : string = ''

  signup() : void{
    this.userService.signup(this.userName)
      .pipe(take(1))
      .subscribe(()=>{
        this.router.navigate(['/'])
      })
  }
}
