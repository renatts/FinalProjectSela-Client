
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpotData } from '../models/spotData';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connection: signalR.HubConnection;
  hubSpots: BehaviorSubject<Array<SpotData>>;

  constructor() {
    this.hubSpots = new BehaviorSubject<Array<SpotData>>(null);
    this.initiateSignalRConnection();
  }

  public initiateSignalRConnection(): Promise<any> {
    return new Promise(() => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(environment.HUB_URL) // the SignalR server url
        .build();

      this.setSignalrClientMethods();

      this.connection
        .start()
        .then(() => {
          console.log(
            `SignalR connection success! connectionId: ${this.connection.connectionId} `
          );
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
        });
    });
  }

  private setSignalrClientMethods(): void {
    this.connection.on('BroadcastSpots', (spots: string) => {
      console.log(spots)
      this.hubSpots.next(JSON.parse(spots));
    });
   }

  // objToStrMap(obj) {
  //   let strMap = new Map();
  //   for (let k of Object.keys(obj)) {
  //     strMap.set(k, obj[k]);
  //   }
  //   return strMap;
  // }

  // jsonToStrMap(jsonStr) {
  //   return this.objToStrMap(JSON.parse(jsonStr));
  // }
}




