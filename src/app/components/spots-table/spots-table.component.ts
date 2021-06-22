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
  spots: Map<string, SpotData>;
  IsEmergency: boolean = false;

  constructor() {}
  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.SERVER_URL + 'test')
      .build();

    if (connection.state === signalR.HubConnectionState.Disconnected) {
      connection
        .start()
        .then(function () {
          console.log('SignalR Connected!');
        })
        .catch((err) => console.log(err));
    }

    connection.on('BroadcastSpots', (data) => {
      this.spots = JSON.parse(data);
    });
  }

  isEmergencyCheck() {
    this.IsEmergency = !this.IsEmergency;
  }
}
