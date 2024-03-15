import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { NgAltSnotifyService } from 'src/app/services/ng-alt-snotify.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isText: boolean = false;
  type:string = "password";
  eyeIcon:string = "fa fa-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private snotify: NgAltSnotifyService
  ) { }

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

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: res => {
          this.snotify.success(res.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: err => {
          this.snotify.error(err?.error.message);
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
