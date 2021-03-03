import { displayNameSelector } from '../../shared/store/app.selectors';
import { saveName } from '../../shared/store/app.actions';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  formInvalid = false;
  formControlClass = 'form-control';
  errorMessage =
    'Oops! Your username must be between 3 and 20 characters long.';

  usernameForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  onContinue() {
    if (this.usernameForm.valid) {
      this.store.dispatch(saveName(this.usernameForm.value));
      this.store.select(displayNameSelector).subscribe((name) => {
        if (name === this.usernameForm.value['username']) {
          this.router.navigate(['/password']);
        } else {
          this.errorMessage = 'User not found!';
          this.formControlClass = `${this.formControlClass} error`;
          this.formInvalid = true;
        }
      });
    } else {
      this.formControlClass = `${this.formControlClass} error`;
      this.formInvalid = true;
    }
  }
}
