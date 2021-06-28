import { Component, OnInit } from '@angular/core';
import { AirPlane } from 'src/app/models/airPlane';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'atc-emergencies-table',
  templateUrl: './emergencies-table.component.html',
  styleUrls: ['./emergencies-table.component.css'],
})
export class EmergenciesTableComponent implements OnInit {
  emergencyPlanes: Array<AirPlane>;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.hubEmergencyAirplanes.subscribe((emergencyPlanes: Array<AirPlane>) => {
      this.emergencyPlanes = emergencyPlanes;
    });
  }
}
