import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import UserInterface from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('http://localhost:3000/users');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }

  getByEmail(email: string): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`http://localhost:3000/users?email=${email}`);
  }

  addNewUser(user: UserInterface): Observable<any> {
    if (user.id) {
      return this.http.put(`http://localhost:3000/users/${user.id}`, user);
    } else {
      return this.http.post('http://localhost:3000/users', user);
    }
  }

  getById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3000/users/${id}`);
  }

  toggleUserBlocked(id: number) {
    this.getById(id).subscribe((user) => {
      if (!user.isBlocked) {
        user.isBlocked = true;
        this.addNewUser(user).subscribe();
      } else {
        user.isBlocked = false;
        this.addNewUser(user).subscribe();
      }
      console.log(user);
    });
  }
}
