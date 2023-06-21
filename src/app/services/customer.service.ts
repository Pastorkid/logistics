import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { customerDocument, Customerlist } from '../interface/customer';
import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CustomerService extends CommonErrorHandler {
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }

  getCustomers(): Observable<customerDocument[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<Customerlist>(`${baseUrl}admin/users`, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          return data.data;
        }),
        catchError(this.handleError)
      );
  }

  // get token from localstorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
