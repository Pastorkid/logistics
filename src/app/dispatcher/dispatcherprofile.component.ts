import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DriverpaymentstatusService } from '../services/driverpaymentstatus.service';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { packageDocumentpayment } from '../interface/getdriverpayment';

@Component({
  selector: 'app-dispatcherprofile',
  templateUrl: './dispatcherprofile.component.html',
  styleUrls: ['./dispatcherprofile.component.css'],
})
export class DispatcherprofileComponent implements OnInit, AfterViewInit {
  isdriverstatus: any;
  newparentstatusone: string = 'Unpaid';
  newparentstatustwo: string = 'Paid';
  driverpayment: any;
  errorMessage: string = '';
  isloading: boolean = false;
  isloadingg: boolean = true;
  hidesimilarmodal: boolean = false;
  sub!: Subscription;
  dispatcherdetails: any;
  titleone: string = 'copy';
  titletwo: string = 'copy';
  titlethree:string='copy'
  titlefour:string='copy'
  titlefive:string='copy'
  newtitle: string = 'copied';
  packages: packageDocumentpayment[] = [];

  displayedColumns: any = [
    'Customer',
    'Location Info',
    'Request Time',
    'Amount Charged',
    'Amount Made(Business)',
    'Payment Status',
  ];

  dataSource!: MatTableDataSource<packageDocumentpayment>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public router: Router,
    private driverpaymentService: DriverpaymentstatusService
  ) { }
  subscribetotabledata() {
    this.sub = this.driverpaymentService
      .getdriverstatuspayment(this.dispatcherdetails.id)
      .subscribe({
        next: (driverpayment) => {
          this.driverpayment = driverpayment;
          this.packages = driverpayment.package;
          this.dataSource = new MatTableDataSource(this.packages);
        },

        error: (err) => {
          this.errorMessage = err;
        },
      });
  }
  ngOnInit(): void {
    this.dispatcherdetails = history.state;
    this.subscribetotabledata();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {}
  togleshowone() {
     return (this.titleone = this.newtitle);
  }
  togleshowtwo() {
     return (this.titletwo = this.newtitle);
  }
  togleshowthree(){
     return (this.titlethree=this.newtitle)
  }
  togleshowfour(){
    return(this.titlefour=this.newtitle)
  }
  togleshowfive(){
      return(this.titlefive=this.newtitle)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isunpaidtoggle(id: string, status: boolean) {
    this.isloading = true;
    this.driverpaymentService
      .updatepaymentstatus(id, status)
      .subscribe((data: void) => {
        this.hidesimilarmodal = true;

        let index: number = this.packages.findIndex((packagei) => {
          packagei.id === id;
          packagei.isDriverPaid === status;
          this.isdriverstatus = status;
          this.subscribetotabledata();
          setTimeout(() => (this.isloading = false), 1000);
        });
        this.packages.slice(index, 1);
      });
  }
  ispaidtoggle(id: string, status: boolean) {
    this.isloading = true;
    this.driverpaymentService
      .updatepaymentstatus(id, status)
      .subscribe((data: void) => {
        this.hidesimilarmodal = true;
        let index: number = this.packages.findIndex((packagei) => {
          packagei.id === id;
          packagei.isDriverPaid === status;
          this.isdriverstatus = status;
          this.subscribetotabledata();
          setTimeout(() => (this.isloading = false), 1000);
        });
        this.packages.slice(index, 1);
      });
  }

  closeSimilarModal() {
    this.isloading = false;
    this.hidesimilarmodal = false;
  }
}
