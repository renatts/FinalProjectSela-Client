import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { SpotData } from '../models/spotData';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public spots: Map<string, SpotData>;
  public broadcastedSpots: Map<string, SpotData>;

  private connection: signalR.HubConnection;

  public startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.SERVER_URL + 'test')
      .build();
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection
        .start()
        .then(() => console.log('SignalR Connected!'))
        .catch((err) => console.log('Error while starting connection: ' + err));
    }
  };

  public addTransferSpotsDataListener(): Map<string, SpotData> {
    let localSpots: Map<string, SpotData>;

    this.connection.on('BroadcastSpots', (data) => {
      localSpots = JSON.parse(data);
    });
    
    console.log(localSpots);
    return localSpots;
  }

  // public broadcastChartData = () => {
  //   this.connection
  //     .invoke('BroadcastSpotsData', this.spots)
  //     .catch((err) => console.error(err));
  // };

  // public addBroadcastSpotsDataListener = () => {
  //   this.connection.on('BroadcastSpotsData', (data) => {
  //     this.broadcastedSpots = data;
  //   });
  // };
}
