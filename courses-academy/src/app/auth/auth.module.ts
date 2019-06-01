import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import routes from './routes';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';

@NgModule ({

    declarations: [
      AuthComponent,
      LoginComponent,
      RegisterComponent
    ],
    
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]

})

export class AuthModule{}