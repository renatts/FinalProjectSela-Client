import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpotData } from '../models/spotData';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public connection: signalR.HubConnection;
  public hubSpots: BehaviorSubject<Map<string, SpotData>>;

  constructor() {
    this.hubSpots = new BehaviorSubject<Map<string, SpotData>>(null);
  }

  public initiateSignalrConnection(): Promise<any> {
    return new Promise(() => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(environment.SERVER_URL + 'test') // the SignalR server url
        .build();

      this.setSignalrClientMethods();

      this.connection.start();
    });
  }

  private setSignalrClientMethods(): void {
    this.connection.on('BroadcastSpots', (message: Map<string, SpotData>) => {
      this.hubSpots.next(message);
    });

    // this.connection.on('UpdateProgressBar', (percentage: number) => {
    //   this.progressPercentage.next(percentage);
    // });

    // this.connection.on('DisplayProgressMessage', (message: string) => {
    //   this.progressMessage.next(message);
    // });
  }
}
