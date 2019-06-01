import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CourseInterface from '../models/course.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: CourseInterface
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  isAdmin: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin();
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

}
