import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import routes from './routes';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
    declarations: [
        UsersComponent, 
        UsersListComponent, 
        UserCardComponent
    ], 
    imports: [
        CommonModule, 
        HttpClientModule,
        RouterModule.forChild(routes)
    ]
})

export class UsersModule { }