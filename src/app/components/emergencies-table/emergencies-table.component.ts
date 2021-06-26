import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AirPlane } from 'src/app/models/airPlane';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-emergencies-table',
  templateUrl: './emergencies-table.component.html',
  styleUrls: ['./emergencies-table.component.css'],
})
export class EmergenciesTableComponent implements OnInit {
  connection: signalR.HubConnection;
  emergencyPlanes: Array<AirPlane>; 

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

    this.connection.on('BroadcastEmergencyPlanes', (data) => {
      this.emergencyPlanes = JSON.parse(data);
    });
  }
}
