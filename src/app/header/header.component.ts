import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  routerSub$: Subscription;
  backArrowVissible = false;
  profileImageVissible = false;
  backArrowClass = 'img-inverted img-hover';

  private setHeaderVisibility(
    backArrowVissible: boolean,
    profileImageVissible: boolean
  ) {
    this.backArrowVissible = backArrowVissible;
    this.profileImageVissible = profileImageVissible;
  }

  ngOnInit() {
    this.routerSub$ = this.router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.checkEvents()
    );
  }

  checkEvents() {
    switch (this.router.url) {
      case '/': {
        this.setHeaderVisibility(false, false);
        break;
      }
      case '/username': {
        this.setHeaderVisibility(false, false);
        break;
      }
      case '/password': {
        this.setHeaderVisibility(true, false);
        break;
      }
      case '/edit-profile': {
        this.setHeaderVisibility(true, true);
        this.backArrowClass = `${this.backArrowClass} filter-color-primary`;
        break;
      }
      default: {
        this.setHeaderVisibility(false, false);
      }
    }
  }

  onBack() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
  }
}
