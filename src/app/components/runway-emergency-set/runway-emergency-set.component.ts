import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-runway-emergency-set',
  templateUrl: './runway-emergency-set.component.html',
  styleUrls: ['./runway-emergency-set.component.css'],
})
export class RunwayEmergencySetComponent implements OnInit {
  runways: Array<string>;
  emergencyRunways: Array<string>;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.hubRunways.subscribe(
      (runways: Array<string>) => {
      this.runways = runways;
    });

    this.signalRService.hubEmergencyRunways.subscribe(
      (emergencyRunways: Array<string>) => {
        this.emergencyRunways = emergencyRunways;
      }
    );
  }

  sendEmergencyRunway(type: any) {
    if (this.signalRService.connection.state === signalR.HubConnectionState.Connected) {
      if (type.checked) {
        this.signalRService.connection
          .invoke('InformRunwayEmergency', type.source.name)
          .then(() => console.log('InformRunwayEmergency succeeded!'))
          .catch((error) => {
            console.log(
              `SignalrDemoHub.InformRunwayEmergency() error: ${error}`
            );
          });
      } else {
        this.signalRService.connection
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
