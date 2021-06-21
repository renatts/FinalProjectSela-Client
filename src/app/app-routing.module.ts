import { NgModule } from '@angular/core';
import { TowerComponent } from './components/tower/tower.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TowerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
