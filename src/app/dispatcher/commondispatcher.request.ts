import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { driverDocument } from '../interface/dispatchers';
import { DispatchersService } from '../services/dispatchers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

enum DispatcherState {
  approved = 'APPROVED',
  disapproved = 'DISAPPROVED',
  pending = 'PENDING',
}
@Component({
  selector: '',
  template: ``,
})
export abstract class Commondispatche {
  pendlength: any;
  disapprovedlength: any;
  approvedlength: any;
  hidemodal: boolean = false;
  hidesimilarmodal: boolean = false;
  ongoingactive: boolean = true;
  errorMessage: string = '';
  sub!: Subscription;
  dispatchers: driverDocument[] = [];

  dataSource!: MatTableDataSource<driverDocument>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output()
  Parentevent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dispatcherService: DispatchersService) {}

  dispatchemethod(params: any) {
    this.sub = this.dispatcherService.getdispatchers(params).subscribe({
      next: (dispatchers) => {
        this.dispatchers = dispatchers;

        if (params == DispatcherState.pending) {
          this.pendlength = dispatchers.length;
        }
        if (params == DispatcherState.disapproved) {
          this.disapprovedlength = dispatchers.length;
        }
        if (params == DispatcherState.approved) {
          this.approvedlength = dispatchers.length;
        }
        this.hidemodal = false;
        this.dataSource = new MatTableDataSource(this.dispatchers);
        this.dataSource.paginator = this.paginator;
        this.ongoingactive = false;
      },

      error: (err) => (this.errorMessage = err),
    });
  }

  updatestatus(id: string, status: string) {
    this.dispatcherService
      .updateDispatcherstatus(id, status)
      .subscribe((data: void) => {
        this.Parentevent.emit(this.hidesimilarmodal);
        let index: number = this.dispatchers.findIndex((dispatchers) => {
          dispatchers.id === id;
          dispatchers.status === status;
        });
        this.dispatchers.slice(index, 1);
        this.hidesimilarmodal = true;
      });
    this.hidemodal = true;
  }

  pendinglength() {
    return this.pendlength;
  }
  disapprovelength() {
    return this.disapprovedlength;
  }
  approvelength() {
    return this.approvedlength;
  }
}
