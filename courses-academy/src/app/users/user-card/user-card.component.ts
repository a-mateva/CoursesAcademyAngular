import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import UserInterface from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})

export class UserCardComponent implements OnInit {

  @Input() user: UserInterface
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onUserBlock(): void {
    this.user.isBlocked = !this.user.isBlocked;
    this.usersService.toggleUserBlocked(this.user.id);
  }

}
