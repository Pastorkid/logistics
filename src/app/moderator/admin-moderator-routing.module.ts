import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminModeratorComponent } from './admin-moderator.component';
import { canLoadGuard } from '../shared/routeGard/canload.guard';
import { canActivateGuard } from '../shared/routeGard/canactivate.guard';
import { CanloadmoderatorGuard } from '../shared/routeGard/canactivatemoderator.guard';

//Decleration of  route path
const routes: Routes = [
  {
    path: '',
    component: AdminModeratorComponent,
    canLoad: [canLoadGuard,CanloadmoderatorGuard],
    canActivate: [canActivateGuard,CanloadmoderatorGuard],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [canLoadGuard, canActivateGuard],
})
export class AdminModeratorRoutingModule {}
