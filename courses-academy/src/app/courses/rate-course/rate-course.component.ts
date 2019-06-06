import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import CourseInterface from '../models/course.model';
import RatingInterface from '../models/rating.model';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.css']
})
export class RateCourseComponent implements OnInit {

  @Input() course: CourseInterface
  rateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private coursesService: CoursesService,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.coursesService.getById(params.id).subscribe((course) => {
          this.createForm();
          this.course = course;
          //this.rateForm.patchValue({ ...course });
          //this.rateForm.patchValue(this.course.ratings);
        })
      }
    });
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isUserEnrolled() {
    return this.authService.getLoggedUser().courses.includes(this.course.id)
  }

  createForm(): void {
    this.rateForm = this.fb.group({
      rating: ['']
    })
  }

  rateCourse(rating: number) {
    let ratingNumber = Number(rating);
    if (ratingNumber >= 1 && ratingNumber <= 10) {
      this.coursesService.rateCourse(this.course.id, 
        this.authService.getLoggedUser().id, ratingNumber).subscribe(/*course => this.course == course*/);
    }
  }

  onFormSubmit() {
    //console.log(this.course);
    this.coursesService.addNewCourse(this.course).subscribe(() => {
      this.rateCourse(this.rateForm.value.rating);
      console.log(this.course);
      this.router.navigateByUrl('courses/list');
    })
  }

  ngOnInit() {
  }


}
