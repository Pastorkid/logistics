import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminDispatcherComponent } from './admin-customer.component';
import { canLoadGuard } from '../shared/routeGard/canload.guard';
import { canActivateGuard } from '../shared/routeGard/canactivate.guard';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminDispatcherComponent,
    canLoad: [canLoadGuard],
    canActivate: [canActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuard, canActivateGuard],
})
export class AdminCustomerRoutingModule {}
