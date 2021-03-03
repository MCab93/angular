export interface RootObject {
  onboarded: boolean;
  user: User;
}

export interface User {
  name: string;
  surname: string;
  displayName: string;
  password: string;
  contact: Contact;
}

export interface Contact {
  email: string;
  phoneNumber: string;
  locations: Location2[];
  socialNetworks: SocialNetwork[];
}

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
}

export interface Location2 {
  id: string;
  name: string;
  location: Location;
  address: Address;
}

export interface Address {
  streetName: string;
  streetNumber: string;
  suburb: string;
  stateOrProvince: string;
  complex: string;
  postalCode: string;
  city: string;
  country: string;
  addressString: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
