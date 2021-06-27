import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-messages-output',
  templateUrl: './messages-output.component.html',
  styleUrls: ['./messages-output.component.css'],
})
export class MessagesOutputComponent implements OnInit {
  connection: signalR.HubConnection;
  messages: Array<string>;
  isShown: boolean;

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

    this.connection.on('BroadcastServerMessages', (data) => {
      this.isShown = true;
      setTimeout(() => {
        this.isShown = false;
      }, 3000);
      this.messages = JSON.parse(data);
      console.log(this.messages);
    });
  }
}
