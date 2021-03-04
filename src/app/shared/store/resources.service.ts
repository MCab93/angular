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
    // MH:  delat cestu '../..' je spatne protoze kdyz se aplikace zbuilduje
    // takz zadna takova cesta neexistuje a tudiz by ti aplikace nacetrla data
    // proto se pouziva pridani data do angular.json, kdyz se podivas do angular.json tak tam najdes ze cely adresar assets se dostane do vysledneho buildu
    // co se tyce ng serve (npm start) tak toto taky bude fungovat protoze zase ten assets je viditelny a muze se na to angular dostat
    // podivej se do dev tools napr v chrome do zalozky source a tam uvidis pod localhost:4200 folder assets a tam vsechno co mas v tomto adresari ve zdrojacich
    return this.httpService.get('assets/sources/data.json');
  }

  hokusPokus() {
    this.httpService.get('assets/sources/data.json').subscribe(
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
