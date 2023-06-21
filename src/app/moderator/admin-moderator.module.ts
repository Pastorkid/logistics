import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormlyModule } from '@ngx-formly/core';
import { ModeratorService } from '../services/moderator.service';
import { GooglemapModule } from '../shared/googlemap/googlemap.module';
import { SidenavbarModule } from '../shared/sidenav.module';
import { UserloginModule } from '../shared/userlogin.module';
import { AdminModeratorRoutingModule } from './admin-moderator-routing.module';
import { AdminModeratorComponent } from './admin-moderator.component';

@NgModule({
  declarations: [AdminModeratorComponent],
  exports: [AdminModeratorComponent],
  imports: [
    CommonModule,
    UserloginModule,
    GoogleMapsModule,
    AdminModeratorRoutingModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SidenavbarModule,
    GooglemapModule,
  ],
  providers: [ModeratorService],
})
export class AdminModeratorModule {}
