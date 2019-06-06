import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from 'src/app/users/services/users.service';
import UserInterface from 'src/app/users/models/user.model';
import {JsonPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private usersService: UsersService) {

  }

  public registerUser(name: string, email: string,
                      password: string, repeatPassword: string):
    Observable<UserInterface> {
    return new Observable((observer) => {
      this.usersService.getAllUsers().subscribe((allUsers) => {
        let user = allUsers.find(user => user.email == email);
        if (user) {
          observer.error('email already in use');
        } else if (password !== repeatPassword) {
          observer.error('passwords don\'t match');
        } else {
          let newUser: UserInterface = {
            id: null,
            name: name,
            email: email,
            isBlocked: false,
            password: password,
            role: 'user',
            courses: []
          };
          this.http.post('http://localhost:3000/users', newUser).subscribe();
        }
      });

    });
  }

  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('loggedUser'); // use !! to convert to boolean
  }

  public getLoggedUser(): UserInterface {
    return JSON.parse(sessionStorage.getItem('loggedUser'));
  }

  public logout() {
    sessionStorage.removeItem('loggedUser');
  }

  public updateLoggedUser() {
    this.usersService.getById(this.getLoggedUser().id).subscribe((response) => {
      this.logout();
      sessionStorage.setItem('loggedUser', JSON.stringify(response));
    });
  }

  public isAdmin(): boolean {
    if (!this.isLoggedIn()) {
      return false;
    } else if (this.getLoggedUser().role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  public login(email: string, password: string): Observable<UserInterface> {
    return new Observable((observer) => {
      this.usersService.getAllUsers().subscribe((allUsers) => {
        const user = allUsers.find(u => u.email == email && u.password == password); //returns either user or undefined
        if (user && !user.isBlocked) {
          sessionStorage.setItem('loggedUser', JSON.stringify(user));
          observer.next(user); //tells us that a user exists
          observer.complete();
        } else if (user && user.isBlocked) {
          observer.error('User is blocked');
        } else {
          observer.error('Incorrect username or password.');
        }
      });
    }); //because this function is synchronous and getAllUsers is async
  }
}
