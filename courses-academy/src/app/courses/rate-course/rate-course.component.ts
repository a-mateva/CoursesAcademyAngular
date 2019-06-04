import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import CourseInterface from '../models/course.model';

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
          console.log(this.course);
          this.rateForm.patchValue({ ...course });
        })
      }
    });
  }

  get rating() {
    return this.rateForm.get('rating');
  }

  createForm(): void {
    this.rateForm = this.fb.group({
      rating: ['']
    });

  }

  onFormSubmit(event: Event) {

  }

  ngOnInit() {
  }

}
