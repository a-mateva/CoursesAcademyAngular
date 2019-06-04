import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { BlockedGuard } from '../auth/guards/blocked.guard';
import { RateCourseComponent } from './rate-course/rate-course.component';

const routes: Routes = [
    {
        path: '', 
        component: CoursesComponent, 
        children: [
            {
                path: 'list', 
                component: CoursesListComponent, 
                canActivate: [BlockedGuard]
            },
            {
                path: 'add', 
                component: AddCourseComponent, 
                canActivate: [AdminGuard, BlockedGuard]
            },
            {
                path: 'add/:id', 
                component: AddCourseComponent,
                canActivate: [AdminGuard, BlockedGuard]
            },
            {
                path:'rate/:id',
                component: RateCourseComponent,
                canActivate: [BlockedGuard]
            }
        ]
    }
]

export default routes;