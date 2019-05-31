import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserInterface
  @Output() onBlock: EventEmitter<number> = new EventEmitter<number>();
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onUserBlock(): void {
    this.user.isBlocked = !this.user.isBlocked;
    this.onBlock.emit(this.user.id);
  }

}
