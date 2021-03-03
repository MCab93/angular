import {
  fullNameSelector,
  onboardedSelector,
  selectFeature,
} from './../../shared/store/app.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';
import { ResourcesService } from 'src/app/shared/store/resources.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private resourcesService: ResourcesService
  ) {}

  fullName$: Observable<string>;
  redirectPath = '/username';

  private checkData() {
    if (localStorage.getItem('profile') === null) {
      this.resourcesService.loadResources();
    }
  }

  ngOnInit() {
    this.checkData();
    this.fullName$ = this.store.select(fullNameSelector);
  }

  onStart() {
    this.store.select(onboardedSelector).subscribe((onboarded) => {
      if (onboarded) {
        this.redirectPath = '/edit-profile';
      }
    });
    this.router.navigate([this.redirectPath]);
  }
}
