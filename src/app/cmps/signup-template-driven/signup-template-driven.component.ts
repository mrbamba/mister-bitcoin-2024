import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'signup-template-driven',
  standalone: false,

  templateUrl: './signup-template-driven.component.html',
  styleUrl: './signup-template-driven.component.scss'
})
export class SignupTemplateDrivenComponent {


  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
