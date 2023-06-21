import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { driverDocument } from '../interface/dispatchers';
import { DispatchersService } from '../services/dispatchers.service';
import { Commondispatche } from './commondispatcher.request';
import { Router } from '@angular/router';

enum DispatcherState {
  approved = 'APPROVED',
  disapproved = 'DISAPROVED',
  pending = 'PENDING',
}
@Component({
  selector: 'app-approveddispatcher',
  templateUrl: './approveddispatcher.component.html',
  styleUrls: ['./approveddispatcher.component.css'],
})
export class ApproveddispatcherComponent
  extends Commondispatche
  implements OnInit, OnDestroy
{
  approveddispatchers: driverDocument[] = [];
  approveddispatcher: driverDocument[] = [];

  displayedColumns: any = [
    'fullname',
    'EmailAddress',
    'Location(state)',
    'month',
    'year',
    'Disapprovedbutton',
    'View',
  ];

  @Output()
  approvedLenght: EventEmitter<number> = new EventEmitter<number>();
  private _selectedUserId: string = '';

  get selectedUserId(): string {
    return this._selectedUserId;
  }
  set selectedUserId(selectedId: string) {
    this._selectedUserId = selectedId;
    this.approveddispatcher = this.performfilter(selectedId);
  }
  constructor(dispatcherService: DispatchersService, public router: Router) {
    super(dispatcherService);
  }

  ngOnInit(): void {
    this.dispatchemethod(DispatcherState.approved);
    this.sub = this.dispatcherService
      .getdispatchers(DispatcherState.approved)
      .subscribe({
        next: (approveddispatcher) => {
          this.approveddispatcher = approveddispatcher;
        },

        error: (err) => (this.errorMessage = err),
      });
  }

  performfilter(selectedId: string): driverDocument[] {
    return this.dispatchers.filter(
      (dispatchers: driverDocument) => dispatchers.id === selectedId
    );
  }

  userSelected(selected: string) {
    this.selectedUserId = selected;
    this.router.navigateByUrl('/dispatcher/profile', {
      state: {
        driver: this.approveddispatcher,
        id: selected,
      },
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  closeSimilarModal() {
    this.ngOnInit();
    this.hidesimilarmodal = false;
  }
}
