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

  // MH: toto nepridava zadnou hodnotu...naopak to prinasi jen problemy...to ze potrebuje delat nejakou inicializaci je nekdy nutne ale tady v tomto pripade to dela jen problemy s finishAppInitializer
  // ty hlavni duvody jsou ty ze bezici akce mezi startAppInitializer a finishAppInitializer bezi v jednom vlaknu a co se dejeme mezi start a finish se nakonec rusi takze pak je videt v app v dev tools v network tab ze se
  // canceled request na data.json
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
