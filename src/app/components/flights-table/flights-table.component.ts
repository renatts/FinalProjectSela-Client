import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AirPlane } from 'src/app/models/airPlane';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css'],
})
export class FlightsTableComponent implements OnInit {
  airplanes: Array<AirPlane>;

  constructor(private signalRService: SignalRService){}
  ngOnInit(): void {
    this.signalRService.hubAirplanes.subscribe(
      (airplanes: Array<AirPlane>) => {
        this.airplanes = airplanes;
      }
    );
  }

  sendEmergencyData(id: number) {
    if (this.signalRService.connection.state === signalR.HubConnectionState.Connected) {
      this.signalRService.connection
        .invoke('InformEmergencyPlane', id.toString())
        .then(() => console.log('InformEmergencyPlane succeeded!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.InformEmergencyPlane() error: ${error}`);
        });
    }
  }
}
