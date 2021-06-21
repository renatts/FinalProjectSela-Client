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
  airplanes: Array<AirPlane>;

  ngOnInit() {
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

    connection.on('BroadcastWaitingAirplanes', (data) => {
      this.airplanes = JSON.parse(data)
    });
   
  }
}
