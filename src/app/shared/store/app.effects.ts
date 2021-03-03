import { Injectable } from '@angular/core';
import {
  OnRunEffects,
  EffectNotification,
  Actions,
  ofType,
  createEffect,
} from '@ngrx/effects';
import { exhaustMap, takeUntil, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResourcesService } from './resources.service';
import {
  startAppInitializer,
  finishAppInitializer,
  loadData,
  dataLoaded,
} from './app.actions';
import { RootObject } from '../model/profile.model';

@Injectable()
export class LoaderEffect implements OnRunEffects {
  constructor(
    public actions$: Actions,
    private resourcesService: ResourcesService
  ) {}

  ngrxOnRunEffects(
    resolvedEffects$: Observable<EffectNotification>
  ): Observable<EffectNotification> {
    return this.actions$.pipe(
      ofType(startAppInitializer),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(finishAppInitializer)))
        )
      )
    );
  }

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      mergeMap(() =>
        this.resourcesService.loadResources().pipe(
          map((data: RootObject) => {
            const user = data['user'];
            const contact = user['contact'];
            const address = contact['locations'][0]['address'];
            const socNetwork = contact['socialNetworks'];
            return dataLoaded({
              user,
              address,
              contact,
              socNetwork,
              editMode: false,
            });
          })
        )
      )
    )
  );
}
