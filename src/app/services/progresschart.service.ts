import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Progressgraph } from '../interface/progressgraph';
import { CommonErrorHandler } from '../shared/getrequesterrorhandler';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ProgresschartService extends CommonErrorHandler {
  constructor(private http: HttpClient,router: Router, authService: AuthService) {
    super(authService, router);
  }
  getprogressgraph(param: string): Observable<Progressgraph> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<any>(`${baseUrl}admin/progress-score?year=${param}`, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
