import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TowerComponent } from './components/tower/tower.component';
import { SpotsTableComponent } from './components/spots-table/spots-table.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';

import { RunwayEmergencySetComponent } from './components/runway-emergency-set/runway-emergency-set.component';
import { EmergenciesTableComponent } from './components/emergencies-table/emergencies-table.component';
import { DisplaySpotsOrderComponent } from './components/display-spots-order/display-spots-order.component';
import { MessagesOutputComponent } from './components/messages-output/messages-output.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    TowerComponent,
    SpotsTableComponent,
    FlightsTableComponent,
    RunwayEmergencySetComponent,
    EmergenciesTableComponent,
    DisplaySpotsOrderComponent,
    MessagesOutputComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
