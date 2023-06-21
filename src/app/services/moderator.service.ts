import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import {
 
  baseUrl
} from 'src/environments/environment';
import {
  getmoderators,
  getmoderatorsDocument,
} from '../interface/getmoderators';

import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ModeratorService extends CommonErrorHandler {
  private getallmoderatorUrl =
    `${baseUrl}admin/all`;
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }

  createNewModerator(
    name: string,
    email: string,
    phone: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(
        `${baseUrl}admin/create`,

        { name, email, phone },
        {
          headers: headers,
        }
      )
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  deleteModerator(id: string): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${baseUrl}admin/delete/${id}`, {
      headers: headers,
    });
  }
  getAllModerator(): Observable<getmoderatorsDocument[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<getmoderators>(`${this.getallmoderatorUrl}`, {
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
