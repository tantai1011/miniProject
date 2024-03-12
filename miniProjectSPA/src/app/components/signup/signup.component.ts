import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

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
      this.auth.signup(this.signUpForm.value).subscribe({
        next: res => {
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: err => {
          alert(err?.error.message);
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
