import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AirPlane } from 'src/app/models/airPlane';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css'],
})
export class FlightsTableComponent implements OnInit {
  connection: signalR.HubConnection;
  airplanes: Array<AirPlane>;

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

    this.connection.on('BroadcastWaitingAirplanes', (data) => {
      this.airplanes = JSON.parse(data);
    });
  }

  sendEmergencyData(id: number) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection
        .invoke('InformEmergencyPlane', id.toString())
        .then(() => console.log('InformEmergencyPlane succeeded!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.InformEmergencyPlane() error: ${error}`);
        });
    }
  }
}
