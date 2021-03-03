import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducer';

export const selectFeature = createFeatureSelector<AppState>('profile');
export const addressSelector = createSelector(
  selectFeature,
  (state) => state['address']
);
export const socNetworkSelector = createSelector(
  selectFeature,
  (state) => state['socNetwork']
);
export const addressNameSelector = createSelector(
  addressSelector,
  (state) => `${state['streetName']} ${state['streetNumber']}`
);
export const streetNameSelector = createSelector(
  addressSelector,
  (state) => state['streetName']
);
export const postalCodeSelector = createSelector(
  addressSelector,
  (state) => state['postalCode']
);
export const suburbSelector = createSelector(
  addressSelector,
  (state) => state['suburb']
);
export const contactSelector = createSelector(
  selectFeature,
  (state) => state['contact']
);
export const emailSelector = createSelector(
  contactSelector,
  (state) => state['email']
);
export const phoneNumberSelector = createSelector(
  contactSelector,
  (state) => state['phoneNumber']
);
export const editModeSelector = createSelector(
  selectFeature,
  (state) => state['editMode']
);
