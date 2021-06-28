import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'atc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Airport Traffic Control';
  isCollapsed: boolean;

  constructor(private router: Router) {}

  start() {
    this.toggleCollapse();
    this.router.navigateByUrl('/airport');
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
