import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import CourseInterface from '../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  constructor(private router: Router, private coursesService: CoursesService) { }

  courses: CourseInterface[] = [];

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((response) => {
      console.log(response); //for test purposes
      this.courses = response;
    })
  }

  onAddCourse() {
    this.router.navigateByUrl('courses/add');
  }

  onCourseDelete(id: number): void {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.coursesService.deleteCourse(id).subscribe(() => {
        console.log('course deleted!' + id);
      })
    }
  }

}
