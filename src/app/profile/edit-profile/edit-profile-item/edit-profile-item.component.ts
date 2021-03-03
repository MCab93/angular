import { deleteAddressItem, deleteContactItem, editAddressItem, editContactItem, editUserItem, setEditMode } from './../../../shared/store/app.actions';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-item',
  templateUrl: './edit-profile-item.component.html',
  styleUrls: ['./edit-profile-item.component.scss']
})
export class EditProfileItemComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  @Input() itemKey: string;
  @Input() itemValue: any;
  @Input() deleteEnabled: boolean;
  inputForm: FormGroup;
  formInvalid = false;
  errorMessage: string;
  formControlClass = 'form-control no-border';

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      input: new FormControl(this.itemValue)
    })
    this.setValidator()
    this.setErrorMsg()
  }

 setValidator() {
    const fieldInput = this.inputForm.get('input')
    switch(this.itemKey) {
      case 'address': {
        fieldInput?.setValidators([Validators.required, Validators.pattern(/^(\w+[a-zA-Z]),[0-9]*$/)])
        break;
      }
      case 'name': {
        fieldInput?.setValidators([Validators.required, Validators.pattern(/^(\w+[a-zA-Z]),(\w+[a-zA-Z])*$/)])
        break;
      }
      case 'postalCode': {
        fieldInput?.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(5)])
        break;
      }
      case 'email': {
        fieldInput?.setValidators([Validators.required, Validators.email])
        break;
      }
      case 'phoneNumber': {
        fieldInput?.setValidators([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(14)])
        break;
      }
      default: {
      }
    }
  }

  setErrorMsg() {
    switch(this.itemKey) {
      case 'name': {
        this.errorMessage = "Please separate name and surname with ','"
        break;
      }
      case 'address': {
        this.errorMessage = "Please separate street and number with ','"
        break;
      }
      case 'postalCode': {
        this.errorMessage = "Please use only numbers. Max 5 numbers are allowed."
        break;
      }
      case 'email': {
        this.errorMessage = "Please enter email in correct format."
        break;
      }
      case 'phoneNumber': {
        this.errorMessage = "Please use only numbers. Min 9 and max 14 numbers are allowed."
        break;
      }
      default: {
        null
      }
    }
  }

  onEdit() {
    const input = this.inputForm.value["input"]
    if (this.checkFormValid()) {
      switch(this.itemKey){
        case 'address' : {
          const inputSplit= input.split(',')
          this.store.dispatch(editAddressItem({itemKey: 'streetName', itemValue: inputSplit[0]}))
          this.store.dispatch(editAddressItem({itemKey: 'streetNumber', itemValue: inputSplit[1]}))
          break;
        }
        case 'name' : {
          const inputSplit= input.split(',')
          this.store.dispatch(editUserItem({itemKey: 'name', itemValue: inputSplit[0]}))
          this.store.dispatch(editUserItem({itemKey: 'surname', itemValue: inputSplit[1]}))
          break;
        }
        case 'username' : {
          this.store.dispatch(setEditMode())
          this.store.dispatch(editUserItem({itemKey: 'username', itemValue: input}))
          break;
        }
        case 'email':
        case 'phone': {
          this.store.dispatch(editContactItem({itemKey: this.itemKey, itemValue: input}))
          break;
        }
        default: {
          this.store.dispatch(editAddressItem({itemKey: this.itemKey, itemValue: input}))
          break;
        }
      }
    }
  }

  onDelete() {
    switch(this.itemKey){
      case 'address' : {
        this.store.dispatch(deleteAddressItem({itemKey: 'streetName'}))
        this.store.dispatch(deleteAddressItem({itemKey: 'streetNumber'}))
        break;
      }
      case 'email' : {
        this.store.dispatch(deleteContactItem({itemKey: 'email'}))
        break;
      }
      case 'phone' : {
        this.store.dispatch(deleteContactItem({itemKey: 'phone'}))
        break;
      }
      default: {
        this.store.dispatch(deleteAddressItem({itemKey: this.itemKey}))
        this.router.navigate(['/edit-profile'])
        break;
      }
    }
    this.router.navigate(['/edit-profile'])
  }

  private checkFormValid(): boolean {
    if (this.inputForm.valid) {
      this.formInvalid = false
      return true
    } else {
      this.formInvalid = true
      this.formControlClass = `form-control error`;
      return false
    }
  }
}
