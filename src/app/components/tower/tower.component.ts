import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SpotData } from 'src/app/models/spotData';
import { SignalRService } from 'src/app/services/signal-r.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.css'],
})
export class TowerComponent implements OnInit {
  public spots: Map<string, SpotData>;
  connection = new signalR.HubConnectionBuilder()
    .withUrl(environment.SERVER_URL + 'test')
    .build();

  connection2 = new signalR.HubConnectionBuilder()
    .withUrl(environment.SERVER_URL + 'transfer')
    .build();

  constructor(public signalRService: SignalRService) {}
  ngOnInit(): void {
    // this.signalRService.startConnection();
    // this.spots = this.signalRService.addTransferSpotsDataListener();

    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl(environment.SERVER_URL + 'test')
    //   .build();

    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection
        .start()
        .then(function () {
          console.log('SignalR Connected!');
        })
        .catch((err) => console.log(err));
    }

    this.connection.on('BroadcastSpots', (data) => {
      this.spots = JSON.parse(data);
    });
  }

  sendData(): void {
    this.connection2.invoke('TransferHello', () => {});
  }
}
