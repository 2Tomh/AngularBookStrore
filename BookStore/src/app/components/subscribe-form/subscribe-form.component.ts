import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent implements OnInit {
  subscribeForm!: FormGroup;
  firstName!: AbstractControl;
  lastName!: AbstractControl;
  age!: AbstractControl;
  email!: AbstractControl;
  password!: AbstractControl;
  passwordRepeated!: AbstractControl;
  terms!: AbstractControl;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscribeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.PasswordValidators]),
      passwordRepeated: new FormControl('', [Validators.required]),
      terms: new FormControl(false, Validators.requiredTrue)
    }, { validators: this.PasswordRepeatedValidator })
    this.firstName = this.subscribeForm.get('firstName')!;
    this.lastName = this.subscribeForm.get('lastName')!;
    this.age = this.subscribeForm.get('age')!;
    this.email = this.subscribeForm.get('email')!;
    this.password = this.subscribeForm.get('password')!;
    this.passwordRepeated = this.subscribeForm.get('passwordRepeated')!;
    this.terms = this.subscribeForm.get('terms')!;
  }
  invalidFirstNameMessage() {
    const errors = this.firstName.errors;
    if (errors?.required) return 'You Must Enter Your First Name';
    if (errors?.minlength) return 'First Name must be at least 2 characters';
    return '';
  }

  invalidAgeMessage() {
    const errors = this.age.errors;
    if (errors?.required) return 'Enter Your age';
    if (errors?.min) return 'Your age must be above 12';
    return '';
  }

  invalidPasswordMessage() {
    const errors = this.password.errors;
    if (errors?.required) return 'Please Enter Password'
    if (errors?.hasSpace || errors?.noNumber) return 'Password must not contain spaces and must include at least one number';
    return ''
  }

  invalidPasswordRepeated() {
    if (this.passwordRepeated.errors?.required) {
      return 'You must repeat the password';
    }
    if (this.subscribeForm.errors?.passwordNotRepeated) {
      return 'Passwords must be identical';
    }
    return '';
  }

 PasswordValidators(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '')
    if (/\s/.test(value)) return { hasSpace: true }
    if (!/\d/.test(value)) return { noNumber: true }
    return null;
  }

  PasswordRepeatedValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordRepeated = control.get('passwordRepeated')?.value;
    return password !== passwordRepeated ? { 'passwordNotRepeated': true } : null;
  }

  onSubmitSubscribeForm() {
    if(this.subscribeForm.valid){
      this.loginService.signUp(this.firstName.value, this.email.value, this.password.value)
    }


  }
}
