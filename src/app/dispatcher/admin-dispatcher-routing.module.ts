import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminDispatcherComponent } from './admin-dispatcher.component';
import { DispatcherprofileComponent } from './dispatcherprofile.component';
import { canLoadGuard } from '../shared/routeGard/canload.guard';
import { canActivateGuard } from '../shared/routeGard/canactivate.guard';
import { DispatcherlistComponent } from './dispatcherlist.component';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminDispatcherComponent,
    canLoad: [canLoadGuard],
    canActivate: [canActivateGuard],
    children: [
      {
        path: '',
        component: DispatcherlistComponent,
      },
      {
        path: 'profile',
        component: DispatcherprofileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuard, canActivateGuard],
})
export class AdminDispatcherRoutingModule {}
