import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PackagesService } from '../services/packages.service';
import { Commonrequest } from './commonhttp.request';

enum PackageState {
  ongoing = 'ONGOING',
  completed = 'DELIVERED',
}

@Component({
  selector: 'app-ongoingrequest',
  templateUrl: './ongoingrequest.component.html',
  styleUrls: ['./ongoingrequest.component.css'],
})
export class OngoingrequestComponent
  extends Commonrequest
  implements OnInit, OnDestroy
{
  @Output()
  Parentevent: EventEmitter<any> = new EventEmitter<any>();
  @Output() Ongoingrequestlength: EventEmitter<number> =
    new EventEmitter<number>();
  constructor(packagesService: PackagesService) {
    super(packagesService);
  }

  ngOnInit(): void {
    this.requestmethod(PackageState.ongoing);
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
