import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { driverDocument } from '../interface/dispatchers';
import { DispatchersService } from '../services/dispatchers.service';
import { Commondispatche } from './commondispatcher.request';

enum DispatcherState {
  approved = 'APPROVED',
  disapproved = 'DISAPPROVED',
  pending = 'PENDING',
}

@Component({
  selector: 'app-pendingdispatcher',
  templateUrl: './pendingdispatcher.component.html',
  styleUrls: ['./pendingdispatcher.component.css'],
})
export class PendingdispatcherComponent
  extends Commondispatche
  implements OnInit, OnDestroy
{
  pendingdispatchers: driverDocument[] = [];
  filteredpendingdispatcher: driverDocument[] = [];

  hideInfo: boolean = false;
  titleone: string = 'copy';
  titletwo: string = 'copy';
  newtitle: string = 'copied';

  displayedColumns: any = [
    'fullname',
    'EmailAddress',
    'Location(state)',
    'month',
    'year',
    'Approvedbutton',
    'Disapprovedbutton',
    'View',
    'Requests Taken',
  ];

  pendingLenght: EventEmitter<number> = new EventEmitter<number>();
  private _selectedUserId: string = '';

  get selectedUserId(): string {
    return this._selectedUserId;
  }
  set selectedUserId(selectedId: string) {
    this._selectedUserId = selectedId;
    this.filteredpendingdispatcher = this.performfilter(selectedId);
  }

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    dispatcherService: DispatchersService
  ) {
    super(dispatcherService);
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.dispatchemethod(DispatcherState.pending);

    this.sub = this.dispatcherService
      .getdispatchers(DispatcherState.pending)
      .subscribe({
        next: (filteredpendingdispatcher) => {
          this.filteredpendingdispatcher = filteredpendingdispatcher;
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
    this.hideInfo = true;
    this.selectedUserId = selected;
    this.router.navigateByUrl('/dispatcher/profile', {
      state: {
        driver: this.filteredpendingdispatcher,
        id: selected,
      },
    });
  }
  userSelectedCanceled() {
    this.hideInfo = true;
  }
  cancelSpecialInfo(): void {
    this.hideInfo = false;
  }
  togleshowone() {
    return (this.titleone = this.newtitle);
  }
  togleshowtwo() {
    return (this.titletwo = this.newtitle);
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
