import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DirectAccessService } from './services/direct-access.service';

@Component({
  selector: 'atc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Airport Traffic Control';
  isCollapsed: boolean;

  constructor(
    private router: Router,
    private accessService: DirectAccessService
  ) {}

  start() {
    this.accessService.isClicked = true;
    this.toggleCollapse();
    this.router.navigateByUrl('/airport');
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
