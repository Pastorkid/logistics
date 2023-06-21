import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PackagesService } from '../services/packages.service';
import { Commonrequest } from './commonhttp.request';
import { Subject } from 'rxjs';

enum PackageState {
  ongoing = 'ONGOING',
  completed = 'DELIVERED',
}

@Component({
  selector: 'app-completedrequest',
  templateUrl: './completedrequest.component.html',
  styleUrls: ['./completedrequest.component.css'],
})
export class CompletedrequestComponent
  extends Commonrequest
  implements OnInit, OnDestroy
{
  @Output() Parentevent: EventEmitter<any> = new EventEmitter<any>();

  constructor(packagesService: PackagesService) {
    super(packagesService);
  }

  ngOnInit(): void {
    this.requestmethod(PackageState.completed);
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
  emitpickup(data: { lat: string; lon: string }) {
    // console.log(data);
    this.Parentevent.emit(data);
  }
}
