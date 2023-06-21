import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private authService: AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = moment(localStorage.getItem('expires_At'));
      const now = moment();
      if (now.isAfter(expirationDate)) {
        // Token has expired, log the user out or perform any required actions
        // For example, you can redirect the user to the login page:
        // window.location.href = '/login';
        this.authService.logout()
        this.router.navigate(['/login']);
      }
    }

    return next.handle(request);
  }
}
