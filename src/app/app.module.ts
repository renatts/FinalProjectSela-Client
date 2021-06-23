import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TowerComponent } from './components/tower/tower.component';
import { SpotsTableComponent } from './components/spots-table/spots-table.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';

import { SignalRService } from './services/signal-r.service';

@NgModule({
  declarations: [
    AppComponent,
    TowerComponent,
    SpotsTableComponent,
    FlightsTableComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    SignalRService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalRService) => () =>
        signalrService.initiateSignalrConnection(),
      deps: [SignalRService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
