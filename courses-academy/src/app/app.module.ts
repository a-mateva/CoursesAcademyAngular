import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import routes from './courses/routes';
import { HttpClientModule } from '@angular/common/http';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UsersComponent } from './users/users.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { MainComponent } from './main/main/main.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CoursesListComponent,
    NavbarAdminComponent,
    AuthComponent,
    CourseCardComponent,
    AddCourseComponent,
    UsersListComponent, 
    UserCardComponent, 
    UsersComponent, 
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes), 
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
