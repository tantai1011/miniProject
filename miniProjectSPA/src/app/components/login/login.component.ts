import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isText: boolean = false;
  type:string = "password";
  eyeIcon:string = "fa fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    if(this.isText) {
      this.type = "text";
      this.eyeIcon = "fa fa-eye";
    } else {
      this.type = "password";
      this.eyeIcon = "fa fa-eye-slash";
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
