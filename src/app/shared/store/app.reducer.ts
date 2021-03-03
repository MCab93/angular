import { Contact, Address } from 'src/app/shared/model/profile.model';
import { SocialNetwork } from './../model/profile.model';
import {
  saveName,
  dataLoaded,
  login,
  logout,
  deleteAddressItem,
  reloadData,
  editAddressItem,
  deleteContactItem,
  editContactItem,
  editUserItem,
  setEditMode,
} from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../model/profile.model';

export interface AppState {
  onboarded: boolean;
  user: User | any;
  address: Address | any;
  contact: Contact | any;
  socNetwork: Array<SocialNetwork>;
  loginName: string;
  editMode: boolean;
}

export const initialState: AppState = {
  onboarded: false,
  user: {},
  address: {},
  contact: {},
  socNetwork: [],
  loginName: '',
  editMode: false,
};

export const appStateReducer = createReducer(
  initialState,
  on(dataLoaded, (state, { user, address, contact, socNetwork, editMode }) => ({
    ...state,
    user,
    address,
    contact,
    socNetwork,
    editMode,
  })),
  on(reloadData, (state, { user, address, contact, socNetwork, editMode }) => ({
    ...state,
    user,
    address,
    contact,
    socNetwork,
    editMode,
  })),
  on(saveName, (state, { username }) => ({ ...state, loginName: username })),
  on(login, (state) => ({ ...state, onboarded: true })),
  on(logout, () => ({} as AppState)),
  on(editUserItem, (state, { itemKey, itemValue }) => ({
    ...state,
    user: setUserItem(state.user, itemKey, itemValue),
  })),
  on(editAddressItem, (state, { itemKey, itemValue }) => ({
    ...state,
    address: setAddressItem(state.address, itemKey, itemValue),
  })),
  on(editContactItem, (state, { itemKey, itemValue }) => ({
    ...state,
    contact: setContactItem(state.contact, itemKey, itemValue),
  })),
  on(deleteContactItem, (state, { itemKey }) => ({
    ...state,
    contact: setContactPropNull(state.contact, itemKey),
  })),
  on(deleteAddressItem, (state, { itemKey }) => ({
    ...state,
    address: setAddressPropNull(state.address, itemKey),
  })),
  on(setEditMode, (state) => ({ ...state, editMode: true }))
);

function setAddressItem(state: Address, itemKey: string, itemValue: string) {
  const key = itemKey === 'city' ? 'suburb' : itemKey;
  return { ...state, [key]: itemValue };
}

function setAddressPropNull(state: Address, itemKey: string) {
  return { ...state, [itemKey]: 'undefined' };
}

function setContactItem(state: Contact, itemKey: string, itemValue: string) {
  const key = itemKey === 'email' ? 'email' : 'phoneNumber';
  return { ...state, [key]: itemValue };
}

function setUserItem(state: User, itemKey: string, itemValue: string) {
  const key = itemKey === 'username' ? 'displayName' : itemKey;
  return { ...state, [key]: itemValue };
}

function setContactPropNull(state: Contact, itemKey: string) {
  const key = itemKey === 'email' ? 'email' : 'phoneNumber';
  return { ...state, [key]: 'undefined' };
}
