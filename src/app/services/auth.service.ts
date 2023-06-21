import { Injectable } from '@angular/core';

import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { UserLogin } from '../interface/userlogin';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    this.isAuthenticated();
    return this.loggedIn.asObservable();
  }
  decodedToken!: { [key: string]: string };
  constructor(private router: Router, private http: HttpClient) {
    this.decodeToken();
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
      return this.decodedToken;
    }

    return false;
  }
  getExpiryTime(): number {
    this.decodeToken();
    return Number(this.decodedToken['exp']);
  }

  checkTokenExpiration(): boolean {
    try {
      const currentTime = moment();
      const expirationTime = moment.unix(this.getExpiryTime());

      return currentTime.isAfter(expirationTime)
    } catch (error) {
      console.log(error);
      return false
    }

    // if (currentTime.isAfter(expirationTime)) {
    //   this.logout(); // Replace with your logout method
    //   return true;
    // }

    // return false;
  }
  // create a logged checker variable and assigned it a false value and then created a method to return the value.
  isAuthenticated(): boolean {
    const token = this.getToken();
    // check token expire
    // if expire delete toke
    // then set isLogin to false
  
  
  
      if (token) {
        this.loggedIn.next(true);
        return true;
      }
     
    else {
      return false;
    }

    
  }

  // user logedin logic
  login(data: UserLogin): Observable<UserLogin> {
    return this.http.post(`${baseUrl}admin/login`, data).pipe(
      map((res: any) => {
        this.saveToken(res.data.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }
  // userlout logic
  logout() {
    this.deleteToken();
    this.loggedIn.next(false);
  }

  // save token to localstorage
  saveToken(token: any) {
    const expiresAt = moment().add(token.expiresIn,'second');
    localStorage.setItem('token', token);
    localStorage.setItem('expires_At',JSON.stringify(expiresAt.valueOf()))
  }
  // delete token from localstorage
  deleteToken(): void {
    localStorage.removeItem('token');
    
  }
  // freh token from local storage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
  // fresh expire_At from local storage

 
  // Error handler method
  private handleError(err: HttpErrorResponse) {
    let errorMessage = ' ';
    console.log(errorMessage)
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
      console.log(errorMessage)
    }
    else if (err.status === 403) {
      errorMessage = `Admin with such Email do not exist or Password entered is Incorrect.`;
    }
     else if(err.status === 401) {
        errorMessage = 'Your session has expired',
        this.logout()
        this.router.navigate(['/login']);
      }
    else {
      errorMessage = `Server returned code:${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
