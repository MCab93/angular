import { AppState } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectFeature = createFeatureSelector<AppState>('profile');
export const onboardedSelector = createSelector(
  selectFeature,
  (state) => state.onboarded
);
export const fullNameSelector = createSelector(
  selectFeature,
  (state) => state.user['name'] + ' ' + state.user['surname']
);
export const loginNameSelector = createSelector(
  selectFeature,
  (state) => state.loginName
);
export const displayNameSelector = createSelector(
  selectFeature,
  (state) => state.user['displayName']
);
export const passwordSelector = createSelector(
  selectFeature,
  (state) => state.user['password']
);
