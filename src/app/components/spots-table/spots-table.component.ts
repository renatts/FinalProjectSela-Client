import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SpotData } from 'src/app/models/spotData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-spots-table',
  templateUrl: './spots-table.component.html',
  styleUrls: ['./spots-table.component.css'],
})
export class SpotsTableComponent implements OnInit {
  connection: signalR.HubConnection;
  spots: Array<SpotData>;

  constructor() {}
  ngOnInit(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.HUB_URL)
      .build();

    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection
        .start()
        .then(function () {
          console.log('SignalR Connected!');
        })
        .catch((err) => console.log(err));
    }

    this.connection.on('BroadcastSpots', (data) => {
      //console.log(data);
      this.spots = JSON.parse(data);
      //console.log(this.spots);
    });
  }

  sendEmergencySpot(spot: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection
        .invoke('InformSpotEmergency', spot.toString())
        .then(() => console.log('InformSpotEmergency succeeeeeeeded!!!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.InformSpotEmergency() error: ${error}`);
        });
    }
    this.spots[parseInt(spot) - 1].IsActive = false;
  }

  cancelEmergencySpot(spot: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection
        .invoke('CancelSpotEmergency', spot.toString())
        .then(() => console.log('CancelSpotEmergency succeeeeeeeded!!!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.CancleSpotEmergency() error: ${error}`);
        });
    }
    this.spots[parseInt(spot) - 1].IsActive = true;
  }
}
