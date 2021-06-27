import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'atc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Airport Traffic Control';
  isCollapsed: boolean = true;

  constructor(private http: HttpClient) {}

  start() {
    this.http.get(environment.SERVER_URL + 'Airport/start').subscribe();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
