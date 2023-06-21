import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { driverDocument } from '../interface/dispatchers';
import { AuthService } from '../services/auth.service';
import { DispatchersService } from '../services/dispatchers.service';
import { ApproveddispatcherComponent } from './approveddispatcher.component';
import { DisapproveddispatcherComponent } from './disapproveddispatcher.component';
import { PendingdispatcherComponent } from './pendingdispatcher.component';
import { Commondispatche } from './commondispatcher.request';
enum DispatcherState {
  approved = 'APPROVED',
  disapproved = 'DISAPPROVED',
  pending = 'PENDING',
}

@Component({
  selector: 'app-dispatcherlist',
  templateUrl: './dispatcherlist.component.html',
  styleUrls: ['./dispatcherlist.component.css'],
})
export class DispatcherlistComponent extends Commondispatche implements OnInit {
  value: boolean = false;
  pendingdispatchers: driverDocument[] = [];
  updatetable: boolean = false;
  disapproveddispatchers: driverDocument[] = [];
  approveddispatchers: driverDocument[] = [];
  isPendingClicked: boolean = false;
  isDisapprovedClicked: boolean = false;
  isApprovedClicked: boolean = true;
  isPendingActive: boolean = true;
  isApprovedActive: boolean = true;
  isDisapprovedActive: boolean = true;

  @ViewChild(ApproveddispatcherComponent)
  approved!: ApproveddispatcherComponent;

  @ViewChild(DisapproveddispatcherComponent)
  disapproved!: DisapproveddispatcherComponent;

  @ViewChild(DisapproveddispatcherComponent, { static: false })
  disapprovedcomponent!: DisapproveddispatcherComponent;

  @ViewChild(PendingdispatcherComponent)
  pending!: PendingdispatcherComponent;

  constructor(
    private authService: AuthService,
    private route: Router,
    dispatcherService: DispatchersService
  ) {
    super(dispatcherService);
  }

  ngOnInit(): void {
    this.dispatchemethod(DispatcherState.pending);
    this.dispatchemethod(DispatcherState.disapproved);
    this.dispatchemethod(DispatcherState.approved);
  }
  ngAfterViewInit(): void {}

  onlogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
  // This is the method for setPending
  setPending() {
    this.isPendingClicked = true;
    this.isPendingActive = false;
    this.isApprovedClicked = false;
    this.isDisapprovedClicked = false;
    this.isApprovedActive = false;
    this.isDisapprovedActive = true;
    this.updatetable = true;
  }

  // This is the method for setAPPROVED
  setApproved() {
    this.isApprovedActive = true;
    this.isApprovedClicked = true;
    this.isPendingClicked = false;
    this.isDisapprovedClicked = false;
    this.isPendingActive = true;
    this.isDisapprovedActive = true;
  }
  // This is the method for setDisapproved
  setDisapproved() {
    this.isDisapprovedClicked = true;
    this.isDisapprovedActive = false;
    this.isApprovedActive = false;
    this.isPendingClicked = false;
    this.isPendingActive = true;
    this.isApprovedClicked = false;
  }

  parentEventHandlerFunction(emitted: boolean) {
    this.value = !emitted;

    if ((this.value = !emitted)) {
      this.ngOnInit();
    }
    
  }
}
