import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SpotData } from 'src/app/models/spotData';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-spots-table',
  templateUrl: './spots-table.component.html',
  styleUrls: ['./spots-table.component.css'],
})
export class SpotsTableComponent implements OnInit {
  spots: Array<SpotData>;

  constructor(private signalRService: SignalRService) {}
  ngOnInit(): void {
    this.signalRService.hubSpots.subscribe((spots: Array<SpotData>) => {
      this.spots = spots;
    });
  }

  sendEmergencySpot(spot: string) {
    if (this.signalRService.connection.state === signalR.HubConnectionState.Connected) {
      this.signalRService.connection
        .invoke('InformSpotEmergency', spot.toString())
        .then(() => console.log('InformSpotEmergency succeeeeeeeded!!!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.InformSpotEmergency() error: ${error}`);
        });
    }
    this.spots[parseInt(spot) - 1].IsActive = false;
  }

  cancelEmergencySpot(spot: string) {
    if (this.signalRService.connection.state === signalR.HubConnectionState.Connected) {
      this.signalRService.connection
        .invoke('CancelSpotEmergency', spot.toString())
        .then(() => console.log('CancelSpotEmergency succeeeeeeeded!!!'))
        .catch((error) => {
          console.log(`SignalrDemoHub.CancleSpotEmergency() error: ${error}`);
        });
    }
    this.spots[parseInt(spot) - 1].IsActive = true;
  }
}
