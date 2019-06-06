import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import CourseInterface from '../models/course.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService,
    private authService: AuthService, private coursesService: CoursesService) { }

  courses: CourseInterface[] = [];
  user = this.authService.getLoggedUser();

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((response) => {
      this.courses = response;
    })
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onAddCourse() {
    if (this.authService.isLoggedIn() && this.authService.getLoggedUser().role === 'admin') {
      this.router.navigateByUrl('courses/add');
    }
  }

  onCourseDelete(id: number): void {
    if (this.authService.isLoggedIn() && this.authService.getLoggedUser().role === 'admin') {
      const index = this.courses.findIndex(c => c.id === id);
      if (index !== -1) {
        this.courses.splice(index, 1);
        this.coursesService.deleteCourse(id).subscribe(() => {
          console.log('course deleted!' + id);
        })
      }
    }
  }

  onUnenroll(id: number) {
    if (this.authService.isLoggedIn()) {
      if (this.user.courses.includes(id)) {
        let itemPosition;
        for (let i in this.user.courses) {
          if (this.user.courses[i] == id) {
            itemPosition = i;
          }
        }
        this.user.courses.splice(itemPosition, 1);
        this.usersService.addNewUser(this.user).subscribe(() => {
          this.authService.updateLoggedUser();
        });
        console.log(this.user);
      } else {
        console.log('user is not enrolled in the first place');
      }
    }
  }

  onRate(course_id: number) {
    this.authService.getLoggedUser().courses.push(this.courses.find(c => c.id === course_id).id);
  }

  onJoin(id: number) {
    if (this.authService.isLoggedIn()) {
      if (this.user.courses.includes(id)) {
        console.log('user is enrolled');
      } else {
        this.user.courses.push(id);
        this.usersService.addNewUser(this.user).subscribe(() => {
          this.authService.updateLoggedUser();
          this.coursesService.getAllCourses().subscribe((response) => {
            this.courses = response;
          });
        });
        console.log(this.user);
      }
    }
  }

}
