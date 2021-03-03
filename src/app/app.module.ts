import {
  startAppInitializer,
  loadData,
  finishAppInitializer,
} from './shared/store/app.actions';
import { RootObject, User } from './shared/model/profile.model';
import { LoaderEffect } from './shared/store/app.effects';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ActionReducer, MetaReducer, Store, StoreModule } from '@ngrx/store';
import { AppState, appStateReducer } from './shared/store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ResourcesService } from './shared/store/resources.service';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['profile'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([LoaderEffect]),
    HttpClientModule,
    ProfileModule,
    StoreModule.forRoot({ profile: appStateReducer }, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],

  providers: [
    ResourcesService,
    LoaderEffect,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [[new Inject(Store)]],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initApplication(store: Store<AppState>): Function {
  return () =>
    new Promise((resolve) => {
      store.dispatch(startAppInitializer());
      store.dispatch(loadData());
      store
        .select((state: any) => state['profile']['user'])
        .subscribe((users: User) => {
          if (users.name !== undefined) {
            store.dispatch(finishAppInitializer());
            resolve(true);
          }
        });
    });
}
