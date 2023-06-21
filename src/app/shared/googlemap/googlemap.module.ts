import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglemapComponent } from './googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [GooglemapComponent],
  exports: [GooglemapComponent],
  imports: [CommonModule, GoogleMapsModule],
})
export class GooglemapModule {}
