import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserloginComponent } from './userlogin.component';

@NgModule({
  declarations: [UserloginComponent],
  exports: [UserloginComponent],
  imports: [CommonModule],
})
export class UserloginModule {}
