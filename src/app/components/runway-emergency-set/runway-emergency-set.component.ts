import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'atc-runway-emergency-set',
  templateUrl: './runway-emergency-set.component.html',
  styleUrls: ['./runway-emergency-set.component.css'],
})
export class RunwayEmergencySetComponent implements OnInit {
  runways: Array<string>;
  landing = true;
  departing = true;

  constructor() {}

  ngOnInit(): void {}
}
