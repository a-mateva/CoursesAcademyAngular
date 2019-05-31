import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CoursesService, 
    private router: Router, private route: ActivatedRoute) { 
      this.route.params.subscribe((params) => {
        console.log(params);
        if (params.id) {
          this.coursesService.getById(params.id).subscribe((course) => {
            console.log(course);
            this.createForm();
            this.courseForm.patchValue({...course})
          });
        }
      });
      this.createForm();
    }

    private createForm(): void {
      this.courseForm = this.fb.group({
        id: [''], 
        title: ['', Validators.required], 
        description: ['', Validators.required],
        rating: ['']
      });
    }

    onFormSubmit(event: Event): void {
      console.log(this.courseForm);
      this.coursesService.addNewCourse(this.courseForm.value).subscribe(() => {
        console.log("course created!");
        this.router.navigateByUrl('courses/list');
      });
    }

    get isFormValid(): boolean {
      return this.courseForm.valid;
    }

    get title() {
      return this.courseForm.get('title');
    }

    get description() {
      return this.courseForm.get('description');
    }

    get rating() {
      return this.courseForm.get('rating');
    }

  ngOnInit() {
  }

}