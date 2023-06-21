import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { driverpayment } from '../interface/getdriverpayment';
import {
  
  baseUrl,

} from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class DriverpaymentstatusService extends CommonErrorHandler {
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }
  getdriverstatuspayment(driverId: string): Observable<driverpayment> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<driverpayment>(`${baseUrl}admin/get-driver-payments?driverId=${driverId}`, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  updatepaymentstatus(id: string, status: boolean): Observable<any> {
    const putbody = {
      details: {
        packageId: id,
        status: status,
      },
    };
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${baseUrl}admin/change-driver-payment-status`, putbody, {
      headers: headers,
    });
  }
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
