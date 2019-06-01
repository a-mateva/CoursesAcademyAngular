import { UsersComponent } from "./users.component";
import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
    {
        path: '', 
        component: UsersComponent, 
        children: [
            {
                path: 'list', 
                component: UsersListComponent
            }
        ]
    }
]
export default routes;