import { Component, OnInit } from '@angular/core';
import { SpotData } from 'src/app/models/spotData';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.css'],
})
export class TowerComponent implements OnInit {
  //connection: signalR.HubConnection;
  spots: Array<SpotData>;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.hubSpots.subscribe((spots: Array<SpotData>) => {
      this.spots = spots;
    });



    // this.connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .withUrl(environment.HUB_URL)
    //   .build();

    // if (this.connection.state === signalR.HubConnectionState.Disconnected) {
    //   this.connection
    //     .start()
    //     .then(function () {
    //       console.log('SignalR Connected!');
    //     })
    //     .catch((err) => console.log(err));
    // }

    // this.connection.on('BroadcastSpots', (data) => {
    //   this.spots = JSON.parse(data);
    // });
  }
}

///////////////////////////////////////////////////////////////

//this.signalRService.connection.invoke('Hello');

// this.signalRService.hubSpots.subscribe((message: Map<string, SpotData>) => {
//   this.spots = message;
// });

// connection = new signalR.HubConnectionBuilder()
//   .configureLogging(signalR.LogLevel.Information)
//   .withUrl(environment.SERVER_URL + 'test')
//   .build();

// if (connection.state === signalR.HubConnectionState.Disconnected) {
//   this.connection
//     .start()
//     .then(function () {
//       console.log('SignalR Connected!');
//     })
//     .catch((err) => console.log(err));
// }

// this.connection.on('BroadcastSpots', (data) => {
//   this.spots = JSON.parse(data);
// });

// this.sendData();
