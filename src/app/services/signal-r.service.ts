import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.HUB_URL)
      .build();

    this.connect();
    this.getMessage();
  }

  public connect() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection
        .start()
        .then(function () {
          console.log('SignalR Connected!');
        })
        .catch((err) => console.log(err));
    }
  }

  public getMessage() {
    this.connection.on('BroadcastMessage', (message) => {
      console.log(message);
    });
  }

  public disconnect() {
    this.connection.stop();
  }
}
