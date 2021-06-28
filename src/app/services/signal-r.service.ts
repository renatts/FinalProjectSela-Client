import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AirPlane } from '../models/airPlane';
import { SpotData } from '../models/spotData';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connection: signalR.HubConnection;
  hubSpots: BehaviorSubject<Array<SpotData>>;
  hubMessages: BehaviorSubject<Array<string>>;
  hubRunways: BehaviorSubject<Array<string>>;
  hubEmergencyRunways: BehaviorSubject<Array<string>>;
  hubAirplanes: BehaviorSubject<Array<AirPlane>>;
  hubEmergencyAirplanes: BehaviorSubject<Array<AirPlane>>;
  hubLandingsOrder: BehaviorSubject<Array<string>>;
  hubTakeoffsOrder: BehaviorSubject<Array<string>>;

  constructor() {
    this.hubSpots = new BehaviorSubject<Array<SpotData>>(null);
    this.hubMessages = new BehaviorSubject<Array<string>>(null);
    this.hubRunways = new BehaviorSubject<Array<string>>(null);
    this.hubEmergencyRunways = new BehaviorSubject<Array<string>>(null);
    this.hubAirplanes = new BehaviorSubject<Array<AirPlane>>(null);
    this.hubEmergencyAirplanes = new BehaviorSubject<Array<AirPlane>>(null);
    this.hubLandingsOrder = new BehaviorSubject<Array<string>>(null);
    this.hubTakeoffsOrder = new BehaviorSubject<Array<string>>(null);
    this.initiateSignalRConnection();
  }

  public initiateSignalRConnection(): Promise<any> {
    return new Promise(() => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(environment.HUB_URL) // the SignalR server url + 'signalrHub'
        .build();

      this.setSignalrClientMethods();

      this.connection
        .start()
        .then(() => {
          console.log(
            `SignalR connection success! connectionId: ${this.connection.connectionId} `
          );
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
        });
    });
  }

  private setSignalrClientMethods(): void {
    // spots table & tower
    this.connection.on('BroadcastSpots', (spots) => {
      this.hubSpots.next(JSON.parse(spots));
    });

    // messages-output
    this.connection.on('BroadcastServerMessages', (data) => {
      this.hubMessages.next(JSON.parse(data));
    });

    // runway-emergency
    this.connection.on('BroadcastRunwayTypes', (data) => {
      this.hubRunways.next(JSON.parse(data));
    });
    this.connection.on('BroadcastEmergencyRunways', (data) => {
      this.hubEmergencyRunways.next(JSON.parse(data));
    });

    // flights-table
    this.connection.on('BroadcastWaitingAirplanes', (data) => {
      this.hubAirplanes.next(JSON.parse(data));
    });

    // emergencies-table
    this.connection.on('BroadcastEmergencyPlanes', (data) => {
      this.hubEmergencyAirplanes.next(JSON.parse(data));
    });

    // display-spots-order (landing)
    this.connection.on('BroadcastLandingsRunwayOrder', (data) => {
      this.hubLandingsOrder.next(JSON.parse(data));
    });

    // display-spots-order (takeoff)
    this.connection.on('BroadcastTakeoffsRunwayOrder', (data) => {
      this.hubTakeoffsOrder.next(JSON.parse(data));
    });
  }
}
