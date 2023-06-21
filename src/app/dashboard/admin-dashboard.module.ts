import { NgModule } from '@angular/core';

import { GoogleMapsModule } from '@angular/google-maps';
import { ChartModule } from 'primeng/chart';
import { SidenavbarModule } from '../shared/sidenav.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { DispatchersService } from '../services/dispatchers.service';
import { GooglemapModule } from '../shared/googlemap/googlemap.module';
import { ProgresschartService } from '../services/progresschart.service';
import { UserloginModule } from '../shared/userlogin.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [
    CommonModule,
    UserloginModule,
    GoogleMapsModule,
    ChartModule,
    SidenavbarModule,
    FormsModule,
    AdminDashboardRoutingModule,
    GooglemapModule,
  ],
  providers: [DispatchersService, ProgresschartService],
})
export class AdminDashboardModule {}
