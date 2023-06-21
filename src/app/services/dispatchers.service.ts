import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import {
  driversList,
  driverDocument,
  topdriverDocument,
  topddriversList,
} from '../interface/dispatchers';
import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { baseUrl,  } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class DispatchersService extends CommonErrorHandler {
  private dispatchersUrl =
    `${baseUrl}admin/drivers?status=`;
  private topdispatchersUrl = `${baseUrl}admin/`;
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }

  getdispatchers(type: string): Observable<driverDocument[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<driversList>(`${this.dispatchersUrl}${type}`, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          return data.data;
        }),
        catchError(this.handleError)
      );
  }

  getTopDispatchers(): Observable<topdriverDocument[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<topddriversList>(`${this.topdispatchersUrl}topDrivers`, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          return data.data;
        }),
        catchError(this.handleError)
      );
  }
  updateDispatcherstatus(id: string, status: string): Observable<any> {
    const putbody = {
      driverId: id,
      status: status,
    };
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${baseUrl}admin/updateDriverStatus`, putbody, {
      headers: headers,
    });
  }
  // get token from localstorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
