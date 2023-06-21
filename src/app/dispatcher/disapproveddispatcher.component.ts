import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { driverDocument } from '../interface/dispatchers';
import { DispatchersService } from '../services/dispatchers.service';
import { Commondispatche } from './commondispatcher.request';
import { Router } from '@angular/router';

enum DispatcherState {
  approved = 'APPROVED',
  disapproved = 'DISAPPROVED',
  pending = 'PENDING',
}
@Component({
  selector: 'app-disapproveddispatcher',
  templateUrl: './disapproveddispatcher.component.html',
  styleUrls: ['./disapproveddispatcher.component.css'],
})
export class DisapproveddispatcherComponent
  extends Commondispatche
  implements OnInit, OnDestroy
{

  disapproveddispatchers: driverDocument[] = [];
  disapproveddispatcher: driverDocument[] = [];
  displayedColumns: any = [
    'fullname',
    'EmailAddress',
    'Location(state)',
    'month',
    'year',
    'Approvedbutton',
    'View',
  ];

  @Output()
  parentLenght: EventEmitter<any> = new EventEmitter<any>();

  private _selectedUserId: string = '';

  get selectedUserId(): string {
    return this._selectedUserId;
  }
  set selectedUserId(selectedId: string) {
    this._selectedUserId = selectedId;
    this.disapproveddispatcher = this.performfilter(selectedId);
  }

  constructor(dispatcherService: DispatchersService, public router: Router) {
    super(dispatcherService);
  }

  ngOnInit(): void {
    this.dispatchemethod(DispatcherState.disapproved);
    this.sub = this.dispatcherService
      .getdispatchers(DispatcherState.disapproved)
      .subscribe({
        next: (disapproveddispatcher) => {
          this.disapproveddispatcher = disapproveddispatcher;
          
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
        driver: this.disapproveddispatcher,
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
    this.hidesimilarmodal = false;
    this.ngOnInit();
  }
}
