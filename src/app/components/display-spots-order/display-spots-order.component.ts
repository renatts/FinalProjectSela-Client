import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-display-spots-order',
  templateUrl: './display-spots-order.component.html',
  styleUrls: ['./display-spots-order.component.css'],
})
export class DisplaySpotsOrderComponent implements OnInit {
  connection: signalR.HubConnection;
  landingsOrder: Array<string>;
  takeoffsOrder: Array<string>;

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

    this.connection.on('BroadcastLandingsRunwayOrder', (data) => {
      console.log(data);
      this.landingsOrder = JSON.parse(data);
      console.log(this.landingsOrder);
    });

    this.connection.on('BroadcastTakeoffsRunwayOrder', (data) => {
      console.log(data);
      this.takeoffsOrder = JSON.parse(data);
      console.log(this.takeoffsOrder);
    });
  }
}
