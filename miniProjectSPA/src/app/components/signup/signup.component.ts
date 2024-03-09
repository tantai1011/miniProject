import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    if(this.isText) {
      this.type = "text";
      this.eyeIcon = "fa fa-eye";
    }
    else {
      this.type = "password";
      this.eyeIcon = "fa fa-eye-slash";
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
