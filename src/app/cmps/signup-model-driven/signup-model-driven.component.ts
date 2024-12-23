import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup-model-driven',
  standalone: false,

  templateUrl: './signup-model-driven.component.html',
  styleUrl: './signup-model-driven.component.scss'
})
export class SignupModelDrivenComponent implements OnInit {
  form!: FormGroup
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), onlyLowerCaseLetters]],
      email: [''],
      addresses: this.fb.array([this.getAddressGroup()]),
      dateOfBirth: [''],
      newsletterSubscription: ['']
    })
  }
  
  ngOnInit(): void {
    
  }
  
  getAddressGroup() {
    return this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zip: [''],
    })
  }

  onAddAddress() {
    (this.form.controls as any).addresses.push(this.getAddressGroup())
  }

}
function onlyLowerCaseLetters(control: AbstractControl) {
  const isCapitalLetters = (/[A-Z]+/).test(control.value)
  return isCapitalLetters ? { onlyLowerCaseLetters: '- Only lower case letters allowed ' } : null

}


// {
//   fullName: '',
//   email: '',
//   address: {
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     zip: '',
//   },
//   bitcoinBalance: 100,
//   _id: '',
//   moves: [],
//   dateOfBirth: Date. now(),
//   newsletterSubscription: true,
// }