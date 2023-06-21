import { NgModule } from '@angular/core';

import { AdminDispatcherComponent } from './admin-dispatcher.component';
import { AdminDispatcherRoutingModule } from './admin-dispatcher-routing.module';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DispatchersService } from '../services/dispatchers.service';

import { ApproveddispatcherComponent } from './approveddispatcher.component';
import { DisapproveddispatcherComponent } from './disapproveddispatcher.component';
import { PendingdispatcherComponent } from './pendingdispatcher.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GooglemapModule } from '../shared/googlemap/googlemap.module';
import { UserloginModule } from '../shared/userlogin.module';
import { DispatcherprofileComponent } from './dispatcherprofile.component';
import { DispatcherlistComponent } from './dispatcherlist.component';
import { DriverpaymentstatusService } from '../services/driverpaymentstatus.service';

@NgModule({
  declarations: [
    AdminDispatcherComponent,
    ApproveddispatcherComponent,
    DisapproveddispatcherComponent,
    PendingdispatcherComponent,
    DispatcherprofileComponent,
    DispatcherlistComponent
  ],
  exports: [AdminDispatcherComponent],
  imports: [
    CommonModule,
    UserloginModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    AdminDispatcherRoutingModule,
    GooglemapModule,
  ],
  providers: [DispatchersService, DriverpaymentstatusService],
})
export class AdminDispatcherModule {}
