import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  redirectToRegister() {
    this.router.navigateByUrl("auth/register");
  }

  ngOnInit() {
  }

  get isFormValid() {
    return this.loginForm.valid;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((user) => {
        if (user.isBlocked) {
          return;
        } else {
          //console.log("login successful");
          user.courses = new Array();
          //console.log(user);
          this.router.navigateByUrl('courses/list'),
            (error) => {
              console.log(error);
            } 
        }        
      });
  }
}
