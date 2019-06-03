import { Component, OnInit, Input } from '@angular/core';
import UserInterface from '../models/user.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserInterface[] = [];

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) { }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
  }

  onUserBlocked(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      let user = this.usersService.getById(id).subscribe((user) => {
        this.usersService.toggleUserBlocked(id);
      });
      console.log("user " + id);
    }
    this.router.navigateByUrl('users/list');
  }

}
