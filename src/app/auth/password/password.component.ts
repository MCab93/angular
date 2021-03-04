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

  // u formu jde nastavovat nativni validatory ktery poskytuje angular jako je required atd da se taky napsat custom validatory a diky temto validatorum muzes zobrazovat i error hlasky ktery priradis k danemu validatoru takze reactive form je dost silny na to si ulehcit praci
  passwordForm = new FormGroup({
    password: new FormControl(),
    passwordConfirm: new FormControl(),
  });

  onContinue() {
    const formValue = this.passwordForm.value;
    let password = formValue['password'];
    // MH: dobre pro toto je pouzivat validator, ktery se definuje pro passwordConfirm u vytvareni FormGroup, pak toto nemusis resit a pak staci jen overovat pre passwordForm.isValid() muzes to na button a neumoznit kliknout dokud nebude form validni
    // takze si usetris strasne moc kodu a tyto if nemusis skoro resit protoze ti do vyresi reactive form sam.
    if (password === formValue['passwordConfirm']) {
      //  MH: obecne subscribce na selectory se delat vetsinou v constructoru nebo onInit() duvod je aby jsi tento selector mel co nejdriv k dispozici
      // navic tady by jsi mel problem s memory leaky protoze jsi neodregistroval subscriber
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
