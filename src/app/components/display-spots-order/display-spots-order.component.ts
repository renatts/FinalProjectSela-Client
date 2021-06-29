import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-display-spots-order',
  templateUrl: './display-spots-order.component.html',
  styleUrls: ['./display-spots-order.component.css'],
})
export class DisplaySpotsOrderComponent implements OnInit {
  landingsOrder: Array<string>;
  takeoffsOrder: Array<string>;
  results: string;
  landingsResults: number;
  takeoffsResults: number;

  constructor(private signalRervice: SignalRService) {}

  ngOnInit(): void {
    this.signalRervice.hubLandingsOrder.subscribe(
      (landingsOrder: Array<string>) => {
        this.landingsOrder = landingsOrder;
      }
    );

    this.signalRervice.hubTakeoffsOrder.subscribe(
      (takeoffsOrder: Array<string>) => {
        this.takeoffsOrder = takeoffsOrder;
      }
    );

    this.signalRervice.hubDisplayResults.subscribe((results: string) => {
      this.results = results;
      if (results !== null) {
        this.landingsResults = parseInt(results.slice(0, results.indexOf('/')));
        this.takeoffsResults = parseInt(
          results.slice(results.indexOf('/') + 1)
        );
      }
    });
  }
}
