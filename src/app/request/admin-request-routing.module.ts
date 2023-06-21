import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRequestComponent } from './admin-request.component';
import { canLoadGuard } from '../shared/routeGard/canload.guard';
import { canActivateGuard } from '../shared/routeGard/canactivate.guard';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminRequestComponent,
    canLoad: [canLoadGuard],
    canActivate: [canActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuard, canActivateGuard],
})
export class AdminRequestRoutingModule {}
