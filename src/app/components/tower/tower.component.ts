import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotData } from 'src/app/models/spotData';
import { SignalRService } from 'src/app/services/signal-r.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.css'],
})
export class TowerComponent implements OnInit {
  spots: Array<SpotData>;

  constructor(
    private signalRService: SignalRService,
    private http: HttpClient
  ) {
    this.http.get(environment.SERVER_URL + 'Airport/start').subscribe();
  }

  ngOnInit(): void {
    this.signalRService.hubSpots.subscribe((spots: Array<SpotData>) => {
      this.spots = spots;
    });
  }
}
