import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  redirectToLogin() {
    this.router.navigateByUrl("auth/login");
  }

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  onRegister(): void {
    this.authService.registerUser(this.registerForm.value.name, this.registerForm.value.email,
      this.registerForm.value.password, this.registerForm.value.repeatPassword).subscribe((user) => {
        console.log("register successful");
        console.log(user);
      }, (error) => {
        console.log(error);
      });
      
      this.redirectToLogin();
  }
}
