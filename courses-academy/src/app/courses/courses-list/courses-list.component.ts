import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import CourseInterface from '../models/course.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private coursesService: CoursesService) { }

  courses: CourseInterface[] = [];
  isAdmin: boolean;

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((response) => {
      console.log(response); //for test purposes
      this.courses = response;
    })
    this.isAdmin = this.authService.getIsAdmin();
  }

  onAddCourse() {
    if (this.authService.isLoggedIn() && this.authService.getLoggedUser().role === 'admin') {
      this.router.navigateByUrl('courses/add');
    }
  }

  onCourseDelete(id: number): void {
    if (this.authService.isLoggedIn() && this.authService.getLoggedUser().role === 'admin'){
      const index = this.courses.findIndex(c => c.id === id);
      if (index !== -1) {
        this.courses.splice(index, 1);
        this.coursesService.deleteCourse(id).subscribe(() => {
          console.log('course deleted!' + id);
        })
      }
    }
  }

}
