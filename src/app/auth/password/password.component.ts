import { passwordSelector } from '../../shared/store/app.selectors';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';
import { login } from 'src/app/shared/store/app.actions';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  formInvalid = false;
  formControlClass = 'form-control';
  errorMsg = 'Passwords are not equal';

  passwordForm = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl(),
  });

  onContinue() {
    const formValue = this.passwordForm.value;
    let password = formValue['password'];
    if (password === formValue['passwordConfirm']) {
      this.store.select(passwordSelector).subscribe((storePassword) => {
        if (password === storePassword) {
          this.store.dispatch(login());
          this.router.navigate(['edit-profile']);
        } else {
          this.formInvalid = true;
          this.formControlClass = `${this.formControlClass} error`;
          this.errorMsg = 'Wrong password';
        }
      });
    } else {
      this.formInvalid = true;
      this.formControlClass = `${this.formControlClass} error`;
    }
  }
}
