import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminRequestRoutingModule } from './admin-request-routing.module';
import { AdminRequestComponent } from './admin-request.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OngoingrequestComponent } from './ongoingrequest.component';
import { CompletedrequestComponent } from './completedrequest.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GooglemapModule } from '../shared/googlemap/googlemap.module';
import { UserloginModule } from '../shared/userlogin.module';

@NgModule({
  declarations: [
    AdminRequestComponent,
    OngoingrequestComponent,
    CompletedrequestComponent,
  ],
  exports: [AdminRequestComponent],
  imports: [
    CommonModule,
    UserloginModule,
    GoogleMapsModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AdminRequestRoutingModule,
    GooglemapModule,
  ],
})
export class AdminRequestModule {}
