import { AppState } from 'src/app/shared/store/app.reducer';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { onboardedSelector } from 'src/app/shared/store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProfile implements CanActivate{

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  return this.store.select(onboardedSelector).pipe(
    map(onboarded => {
      if (onboarded) {
        this.router.navigateByUrl('edit-profile');
        return false
      } else {
        return true
      }
    })
  )
  }
}
