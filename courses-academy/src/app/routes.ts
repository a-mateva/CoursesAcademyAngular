import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { NonAuthenticatedGuard } from './auth/guards/non-authenticated.guard';
import { MainComponent } from './main/main/main.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { BlockedGuard } from './auth/guards/blocked.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                canLoad: [AuthenticatedGuard],
                canActivate: [BlockedGuard, AdminGuard]
            },
        ]
    },

    {
        path: '', 
        redirectTo: 'courses',
        pathMatch: 'full'
    },

    {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule',
        canActivate: [BlockedGuard]
    },

    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
        canLoad: [NonAuthenticatedGuard]
    }
];

export default routes;