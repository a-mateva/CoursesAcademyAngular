import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UsersComponent } from '../users/users.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { NonAuthenticatedGuard } from '../auth/guards/non-authenticated.guard';

const routes: Routes = [
    {
        path: 'courses',
        component: CoursesComponent,
        children: [
            {
                path: 'list',
                component: CoursesListComponent,
                canLoad: [AuthenticatedGuard]
            },
            {
                path: 'add',
                component: AddCourseComponent,
                canLoad: [AuthenticatedGuard]
            },
            {
                path: 'add/:id', //we specify parameters in this way
                component: AddCourseComponent,
                canLoad: [AuthenticatedGuard]
            }
        ] //children paths
    },
    {
        path: 'users',
        component: UsersComponent,        
        children: [
            {
                path: 'list',
                component: UsersListComponent,
                canLoad: [AuthenticatedGuard]
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canLoad: [NonAuthenticatedGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canLoad: [NonAuthenticatedGuard]
            }
        ]
    }
];

export default routes;