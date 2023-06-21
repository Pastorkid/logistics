import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { customerDocument } from '../interface/customer';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import * as moment from 'moment';

@Component({
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css'],
})
export class AdminDispatcherComponent implements OnInit, OnDestroy {
  tokenExpiration:any
  hidesimilarmodal: boolean = false;
  ongoingactive: boolean = true;
  customers: customerDocument[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  displayedColumns: any = [
    'fullname',
    'Location(state)',
    'month',
    'year',
    'Requests Taken',
    'Total Amount Spent',
  ];

  dataSource!: MatTableDataSource<customerDocument>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private authService: AuthService,
    private route: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.sub = this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.ongoingactive = false;
      },

      error: (err) => {
        if (err) {
          this.hidesimilarmodal = true;
        }
        this.errorMessage = err;
      },
    });
  }
  ngOnDestroy(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onlogout(): void {
    
    this.authService.logout();
    this.route.navigate(['/login']);
  }
   
  closeSimilarModal() {
    this.hidesimilarmodal = false;
  }
  
}
