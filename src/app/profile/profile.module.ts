import { AuthGuardPassword } from './../shared/auth.guard.password';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileItemComponent } from './edit-profile/edit-profile-item/edit-profile-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditProfileComponent, EditProfileItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditProfileComponent,
        canActivate: [AuthGuardPassword],
      },
    ]),
  ],
})
export class ProfileModule {}
