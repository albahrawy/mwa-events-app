import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppUserRoutingModule } from './app-user-routing';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppUserRoutingModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin', component: SigninComponent
      },
      {
        path: '', redirectTo: 'signup', pathMatch: 'full'
      }
    ])
  ]
})
export class UserModule { }
