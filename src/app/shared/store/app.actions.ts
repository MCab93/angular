import { Contact } from 'src/app/shared/model/profile.model';
import { SocialNetwork, User, Address } from './../model/profile.model';
import { createAction, props } from '@ngrx/store';

export const startAppInitializer = createAction(
  '[App Init] Start App Initializer'
);

export const finishAppInitializer = createAction(
  '[App Init] Finish App Initializer'
);

export const loadData = createAction('[App Init] Load Data');

export const dataLoaded = createAction(
  '[App Init] Data Loaded',
  props<{
    user: User;
    address: Address;
    contact: Contact;
    socNetwork: SocialNetwork[];
    editMode: false;
  }>()
);

export const reloadData = createAction(
  '[Edit Profile] Load Profile',
  props<{
    user: User;
    address: Address;
    contact: Contact;
    socNetwork: SocialNetwork[];
    editMode: false;
  }>()
);

export const saveName = createAction(
  '[Auth Username] Save Name',
  props<{ username: string }>()
);

export const login = createAction('[Auth Password] Login');

export const logout = createAction('[Edit Profile] Logout');

export const deleteAddressItem = createAction(
  '[Edit Profile] Null Address Param',
  props<{ itemKey: string }>()
);

export const deleteContactItem = createAction(
  '[Edit Profile] Null Contact Param',
  props<{ itemKey: string }>()
);

export const editAddressItem = createAction(
  '[Edit Profile] Edit Address Param',
  props<{ itemKey: string; itemValue: string }>()
);

export const editContactItem = createAction(
  '[Edit Profile] Edit Contact Param',
  props<{ itemKey: string; itemValue: string }>()
);

export const editUserItem = createAction(
  '[Edit Profile] Edit User Param',
  props<{ itemKey: string; itemValue: string }>()
);

export const setEditMode = createAction('[Edit Profile] Set Edit Mode');
