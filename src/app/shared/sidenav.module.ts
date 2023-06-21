import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSidenavComponent } from '../shared/sidenav.component';
import { RouterModule } from '@angular/router';
import { UserloginComponent } from './userlogin.component';
@NgModule({
  declarations: [AdminSidenavComponent],
  exports: [AdminSidenavComponent],
  imports: [CommonModule, RouterModule],
})
export class SidenavbarModule {}
