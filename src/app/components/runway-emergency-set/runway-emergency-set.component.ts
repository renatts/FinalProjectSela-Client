import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-runway-emergency-set',
  templateUrl: './runway-emergency-set.component.html',
  styleUrls: ['./runway-emergency-set.component.css'],
})
export class RunwayEmergencySetComponent implements OnInit {
  connection: signalR.HubConnection;
  runways: Array<string>;
  emergencyRunways: Array<string>;

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
    
    this.connection.on('BroadcastRunwayTypes', (data) => {
      this.runways = JSON.parse(data);
    });

    this.connection.on('BroadcastEmergencyRunways', (data) => {
      this.emergencyRunways = JSON.parse(data);
    });
  }

  sendEmergencyRunway(type: any) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      if (type.checked) {
        this.connection
          .invoke('InformRunwayEmergency', type.source.name)
          .then(() => console.log('InformRunwayEmergency succeeded!'))
          .catch((error) => {
            console.log(
              `SignalrDemoHub.InformRunwayEmergency() error: ${error}`
            );
          });
      } else {
        this.connection
          .invoke('CancelRunwayEmergency', type.source.name)
          .then(() => console.log('CancelRunwayEmergency succeeded!'))
          .catch((error) => {
            console.log(
              `SignalrDemoHub.CancelRunwayEmergency() error: ${error}`
            );
          });
      }
    }
  }
}
