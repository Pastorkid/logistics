import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [AdminLoginComponent],
  exports: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AdminLoginModule {}

