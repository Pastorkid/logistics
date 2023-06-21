import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { canLoadGuard } from '../shared/routeGard/canload.guard';
import { canActivateGuard } from '../shared/routeGard/canactivate.guard';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canLoad: [canLoadGuard],
    canActivate: [canActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuard, canActivateGuard],
})
export class AdminDashboardRoutingModule {}
