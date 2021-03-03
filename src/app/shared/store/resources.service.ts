import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootObject } from "../model/profile.model";
import { reloadData } from "./app.actions";
import { AppState } from "./app.reducer";

@Injectable({ providedIn: 'root'})
export class ResourcesService {
  constructor(private store: Store<AppState>, private httpService: HttpClient) {}

  loadResources() {
    return this.httpService.get('../../../assets/sources/data.json')
  }

  hokusPokus() {
    this.httpService.get('../../../assets/sources/data.json').subscribe(
      (data: RootObject) => {
        const user = data['user'];
        const contact = user['contact'];
        const address = contact['locations'][0]['address'];
        const socNetwork = contact['socialNetworks'];
        return this.store.dispatch(
          reloadData({
            user,
            address,
            contact,
            socNetwork,
            editMode: false,
          })
        );
      })
  }
}
