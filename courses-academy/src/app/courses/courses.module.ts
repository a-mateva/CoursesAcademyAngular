import { NgModule } from "@angular/core";
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import routes from './routes';

@NgModule({
    declarations: [
        CoursesComponent, 
        CoursesListComponent, 
        AddCourseComponent, 
        CourseCardComponent
    ], 
    imports: [
        CommonModule, 
        HttpClientModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes)
    ]

})
export class CoursesModule { }