import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { packageDocument, Packages } from '../interface/packages';
import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PackagesService extends CommonErrorHandler {
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }

  getpackackerequests(filter: string): Observable<packageDocument[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<Packages>(`${baseUrl}admin/packages?filter=${filter}`, {
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
