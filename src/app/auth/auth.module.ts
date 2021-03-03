import { AuthGuardPassword } from './../shared/auth.guard.password';
import { PasswordComponent } from './password/password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsernameComponent } from './username/username.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  declarations: [
    IntroductionComponent,
    UsernameComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "username", component: UsernameComponent},
      { path: "password", component: PasswordComponent}, //canActivate: [AuthGuardPassword]},
      { path: "", component: IntroductionComponent},
    ])
  ]
})
export class AuthModule { }
