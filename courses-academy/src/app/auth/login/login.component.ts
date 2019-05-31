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

  onLogin(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((user) => {
        console.log("login successful");
        console.log(user);
        //TODO change this url, should lead somewhere else
        this.router.navigateByUrl('courses/list'),
          (error) => {
            console.log(error);
          } 
      });
  }
}
