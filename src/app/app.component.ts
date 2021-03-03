import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  title = 'entry-task';
  backgroundClass = 'background-primary';
  routerSub$: Subscription;

  ngOnInit() {
    this.routerSub$ = this.router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.checkEvents()
    );
  }

  checkEvents() {
    switch (this.router.url) {
      case '/edit-profile': {
        this.backgroundClass = 'background-white';
        break;
      }
      default: {
        this.backgroundClass = 'background-primary';
      }
    }
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
  }
}
