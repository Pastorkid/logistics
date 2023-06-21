import { Subscription } from 'rxjs';
import { PackagesService } from '../services/packages.service';
import { packageDocument } from '../interface/packages';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

enum PackageState {
  ongoing = 'ONGOING',
  completed = 'DELIVERED',
}
@Component({
  selector: '',
  template: ``,
})
export abstract class Commonrequest {
  displayedColumns: any = [
    'fullname',
    'D&T',
    'Approx. W&S',
    'Pick-up location',
    'Drop-off location ',
    'Income',
  ];
  completedlength: any;
  ongoinglength: any;
  ongoingactive: boolean = true;
  packages: packageDocument[] = [];

  errorMessage: string = '';
  sub!: Subscription;

  dataSource!: MatTableDataSource<packageDocument>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private packagesService: PackagesService) {}

  requestmethod(params: any) {
    this.sub = this.packagesService.getpackackerequests(params).subscribe({
      next: (packages) => {
        this.packages = packages;
        if (params == PackageState.completed) {
          this.completedlength = packages.length;
          console.log(params);
          console.log(params, this.completedlength);
        }
        if (params == PackageState.ongoing) {
          this.ongoinglength = packages.length;
          console.log(params);
        }

        console.log((this.packages = packages));
        this.dataSource = new MatTableDataSource(this.packages);
        this.dataSource.paginator = this.paginator;
        this.ongoingactive = false;
      },

      error: (err) => (this.errorMessage = err),
    });
  }

  requestcomplete() {
    return this.completedlength;
  }
  requestongoing() {
    return this.ongoinglength;
  }
}
