import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

const routes: Routes = [
    {
        path: '', 
        component: CoursesComponent, 
        children: [
            {
                path: 'list', 
                component: CoursesListComponent
            },
            {
                path: 'add', 
                component: AddCourseComponent, 
                canLoad: [AuthenticatedGuard]
            },
            {
                path: 'add/:id', 
                component: AddCourseComponent,
                canLoad: [AuthenticatedGuard]
            },
        ]
    }
]

export default routes;