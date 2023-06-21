import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { canLoadGuardLogin } from '../shared/routeGard/canLoadLogin.guard';
import { canActivateGuardLogin } from '../shared/routeGard/canActivateLogin.guard';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent,
    canLoad: [canLoadGuardLogin],
    canActivate: [canActivateGuardLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuardLogin, canActivateGuardLogin],
})
export class AdminLoginRoutingModule {}
