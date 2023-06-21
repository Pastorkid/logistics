import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { topdriverDocument } from '../interface/dispatchers';
import { Progressgraph } from '../interface/progressgraph';
import { AuthService } from '../services/auth.service';
import { DispatchersService } from '../services/dispatchers.service';
import { ProgresschartService } from '../services/progresschart.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  selectedyearset!: number;
  selectedYear!: number;
  pastSelectedYear: number = 0;
  years: number[] = [];
  january: string[] = [];
  febuary: string[] = [];
  hidesimilarmodal: boolean = false;
  basicData: any;
  basicOptions: any;
  errorMessage: string = '';
  sub!: Subscription;
  progressgraphdata!: Progressgraph;
  topdispatchers: topdriverDocument[] = [];
  topdrivers: topdriverDocument[] = [];
  // chartData and configurations start

  // chartData and configurations end
  constructor(
    private authService: AuthService,
    private route: Router,
    private dispatcherService: DispatchersService,
    private progressgraphService: ProgresschartService
  ) {}
  private _selectedUserId: string = '';

  get selectedUserId(): string {
    return this._selectedUserId;
  }
  set selectedUserId(selectedId: string) {
    this._selectedUserId = selectedId;
  }
  ngOnInit(): void {
    
    this.sub = this.dispatcherService.getTopDispatchers().subscribe({
      next: (topdispatchers) => {
        this.topdispatchers = topdispatchers;
        const topdrivers = this.topdispatchers.slice(0, 3);
        this.topdrivers = topdrivers;
        return topdrivers;
      },

      error: (err) => {
        if (err) {
          this.hidesimilarmodal = true;
        }
        this.errorMessage = err;
      },
    });

    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2023; year--) {
      this.years.push(year);
    }
    this.selectedvalue(new Date().getFullYear());
  }
  selectedvalue(selectyear: any) {
    if (this.pastSelectedYear === selectyear) {
      console.log('npt');
      return null;
    }
    this.sub = this.progressgraphService
      .getprogressgraph(String(selectyear))
      .subscribe({
        next: (proGress) => {
          this.pastSelectedYear = selectyear;
          this.progressgraphdata = proGress;
          console.log((this.progressgraphdata = proGress));
          this.january = [];
          proGress.customer.map((m) => {
            if (m.month == '4') {
              this.january.push(m.month);
            }
          });

          console.log(this.january.length);
          this.basicData = {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            datasets: [
              {
                label: 'Request',
                data: [this.january.length, this.febuary],
                fill: false,
                borderColor: '#3366FF',
                tension: 0.4,
              },
              {
                label: 'customers',
                data: [],
                fill: false,
                borderColor: '#00D68F',
                tension: 0.4,
              },
            ],
          };
          this.basicOptions = {
            title: {
              display: true,
              text: 'Article Views',
              fontSize: 32,
              position: 'top',
            },
            scales: {
              x: {
                ticks: {
                  color: '#495057',
                },
                grid: {
                  color: '#ebedef',
                },
              },
              y: {
                ticks: {
                  color: '#495057',
                },
                grid: {
                  color: '#ebedef',
                },
              },
            },
          };
        },
      });
    return selectyear;
  }
  onlogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
  closeSimilarModal() {
    this.hidesimilarmodal = false;
  }

  // return { this.years, this.currentYear };
}
