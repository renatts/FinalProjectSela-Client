import { NgModule } from '@angular/core';
import { TowerComponent } from './components/tower/tower.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DirectAccessGuard } from './guards/direct-access.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  {
    path: 'airport',
    component: TowerComponent,
    canActivate: [DirectAccessGuard],
  },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
