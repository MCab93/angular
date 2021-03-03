import { logout } from 'src/app/shared/store/app.actions';
import { editModeSelector } from './../store/profile.selectors';
import {
  displayNameSelector,
  fullNameSelector,
} from './../../shared/store/app.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';
import { Observable } from 'rxjs';
import { RootObject, SocialNetwork } from 'src/app/shared/model/profile.model';
import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/shared/store/resources.service';
import {
  addressNameSelector,
  suburbSelector,
  postalCodeSelector,
  emailSelector,
  phoneNumberSelector,
  socNetworkSelector,
} from '../store/profile.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private resourcesService: ResourcesService
  ) {}

  userItems$ = new Map<string, Observable<string>>();
  addressItems$ = new Map<string, Observable<string>>();
  socNetworkItems$ = new Map<string, string>();

  private loadData() {
    this.setUsernameItems();
    this.setAddressItems();
    this.setSocialNetworkItems();
  }

  private setUsernameItems() {
    this.userItems$.set('name', this.store.select(fullNameSelector));
    this.userItems$.set('username', this.store.select(displayNameSelector));
  }

  private setAddressItems() {
    this.addressItems$.set('address', this.store.select(addressNameSelector));
    this.addressItems$.set('city', this.store.select(suburbSelector));
    this.addressItems$.set('postalCode', this.store.select(postalCodeSelector));
    this.addressItems$.set('email', this.store.select(emailSelector));
    this.addressItems$.set('phone', this.store.select(phoneNumberSelector));
  }

  private setSocialNetworkItems() {
    this.store.select(socNetworkSelector).subscribe((data: SocialNetwork[]) => {
      data.forEach((item: SocialNetwork) => {
        const imgSource =
          item.id === 'twitter'
            ? '../../../assets/images/Twitter@3x.png'
            : '../../../assets/images/LinkedIn@3x.png';
        this.socNetworkItems$.set(imgSource, item.url);
      });
    });
  }

  ngOnInit(): void {
    this.checkUser();
  }

  private checkUser() {
    localStorage.getItem('profile');
    const appData = localStorage.getItem('profile');
    this.store.select(editModeSelector).subscribe((editMode) => {
      if (!editMode && appData) {
        const appDataParsed = JSON.parse(appData);
        this.resourcesService.loadResources().subscribe((data: RootObject) => {
          if (
            appDataParsed['user']['displayName'] === data['user']['displayName']
          ) {
            this.loadData();
          } else {
            this.resourcesService.loadResources();
            this.router.navigateByUrl('/');
          }
        });
      } else {
        this.loadData();
      }
    });
  }

  onLogout() {
    this.store.dispatch(logout());
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
