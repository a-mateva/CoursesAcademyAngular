import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CourseInterface from '../models/course.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseInterface
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onJoin: EventEmitter<number> = new EventEmitter();
  @Output() onUnenroll: EventEmitter<number> = new EventEmitter();
  @Output() onRate: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router, private usersService: UsersService, private authService: AuthService) { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onCourseDelete() {
    if (this.authService.isLoggedIn() && this.isAdmin) {
      this.onDelete.emit(this.course.id);
    }
  }

  onCourseEdit() {
    if (this.authService.isLoggedIn() && this.isAdmin)
      this.router.navigate(['courses/add', this.course.id]);
  }

  isUserEnrolled(): boolean {
    if (!this.authService.isLoggedIn()) {
      return false;
    } else {
      return this.authService.getLoggedUser().courses.includes(this.course.id);
    }
  }

  onCourseUnenroll() {
    if (this.isUserEnrolled()) {
      this.onUnenroll.emit(this.course.id);
    }
  }

  onCourseJoin() {
    if (!this.isUserEnrolled()) {
      this.onJoin.emit(this.course.id);
    }
  }

  onCourseRate() {
    this.onRate.emit(this.course.id);
    this.router.navigateByUrl(`courses/rate/${this.course.id}`);
  }
}
