import { NgModule } from '@angular/core';

import { SidenavbarModule } from '../shared/sidenav.module';
import { MatTableModule } from '@angular/material/table';
import { AdminDispatcherComponent } from './admin-customer.component';
import { AdminCustomerRoutingModule } from './admin-customer-routing.module';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { CustomerService } from '../services/customer.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GooglemapModule } from '../shared/googlemap/googlemap.module';
import { UserloginModule } from '../shared/userlogin.module';

@NgModule({
  declarations: [AdminDispatcherComponent],
  exports: [AdminDispatcherComponent],
  imports: [
    CommonModule,
    UserloginModule,
    GoogleMapsModule,
    SidenavbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    AdminCustomerRoutingModule,
    GooglemapModule,
  ],
  providers: [CustomerService],
})
export class AdminCustomerModule {}
