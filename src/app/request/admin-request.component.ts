import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OngoingrequestComponent } from './ongoingrequest.component';
import { CompletedrequestComponent } from './completedrequest.component';

import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GooglemapComponent } from '../shared/googlemap/googlemap.component';
import { Commonrequest } from './commonhttp.request';
import { PackagesService } from '../services/packages.service';
import * as moment from 'moment';

enum PackageState {
  ongoing = 'ONGOING',
  completed = 'DELIVERED',
}
@Component({
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.css'],
})
export class AdminRequestComponent
  extends Commonrequest
  implements OnInit, AfterViewInit
{
  zoomchange: Subject<number> = new Subject();
  completedpackagelength: any;
  ongoingpickuplatlon: any;
  isOngoingClicked: boolean = true;
  isCompletedClicked: boolean = false;
  isOngoingActive: boolean = false;
  isCompletedActive: boolean = true;
  @ViewChild(GooglemapComponent) map!: GooglemapComponent;

  constructor(
    private authService: AuthService,
    private route: Router,
    packagesService: PackagesService
  ) {
    super(packagesService);
  }
  ngAfterViewInit(): void {
    if (this.map.loaded) {
      this.map.zoom.next(6);
    }
  }

  ngOnInit(): void {
    
  //   this.authService.checkTokenExpiration();
  //   // Set up periodic check every 5 minutes (300,000 milliseconds)
  // setInterval(() => {
  //   this.authService.checkTokenExpiration();
  // }, 300000);
    this.requestmethod(PackageState.completed);
    this.requestmethod(PackageState.ongoing);
  }

  @ViewChild(OngoingrequestComponent)
  ongoing!: OngoingrequestComponent;

  @ViewChild(CompletedrequestComponent)
  complete!: CompletedrequestComponent;

  // This is the method for setCompleted
  setCompleted() {
    this.isCompletedClicked = true;
    this.isCompletedActive = false;
    this.isOngoingClicked = false;
    this.isOngoingActive = true;
  }

  // This is the method for setOngoing
  setOngoing() {
    this.isOngoingActive = false;
    this.isOngoingClicked = true;
    this.isCompletedClicked = false;
    this.isCompletedActive = true;
  }
  onlogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  ongoingfuction(emit: { lat: string; lon: string }, el: HTMLElement) {
    this.ongoingpickuplatlon = emit;
    el.scrollIntoView({ behavior: 'smooth' });
    this.map.center.next({
      lat: Number(emit.lat),
      lng: Number(emit.lon),
    });
    this.map.zoom.next(12);
 
  }
}
