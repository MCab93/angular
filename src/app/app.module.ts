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

// MH: super pro inincializci aplikaci, hlavne se to pouziva kdyz potrebuje nacist nejake data ktere potrebujeme aby app mela nez se spusti
// v tomto pripade to neni potreba takze toto neni dobry priklad pouziti. Dam priklad...mame app ktera potrebuje znat externi konfiguraci nebo si taha data z api pro lokalizace a my nechteme
// nebo nemuzeme spustit app bez techto dat
// v tomto pripade se jedna o load nejakeho uzivatele ktey muzeme klidne nacist az se aplikace nacte. Navic ty data ktera se nacitaji nejsou uplne strategicky dulezita a kdyby ti spadlo volani api na nejaky endpoint ktery zrovna nepojede tak se ti nenacte app a budes mit bilou obrazovku
// ale jinak malo angular vyvojaru zna token APP_INITIALIZER a jak se pouziva takze super ze vis jak na to ale nevhodne pouzite
export function initApplication(store: Store<AppState>): Function {
  return () =>
    new Promise((resolve, reject) => {
      store.dispatch(startAppInitializer());
      store.dispatch(loadData());
      store
        .select((state: any) => state['profile']['user'])
        .subscribe((users: User) => {
          // MH: tady mas problem kdyz object user bude undefined | null tak ti to bude padat ze name property neexistuje a dalsi vec je ta ze kdyz ti to tady spadne tak nemas nikde handling reject takze se tento promise nikdy neukonci ani chybou protoze porad bude cekat na resolve
          if (users?.name !== undefined) {
            // MH: toto jsem popsal v effect kde se resit start a finis (app.effects.ts)
            // kdyz toto zakomentuji tak je videt ze nacitani neskonci canceled requestu
            // store.dispatch(finishAppInitializer());
            resolve(true);
          }
        });
    });
}
