import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export abstract class CommonErrorHandler {
  authService: any;
  router: any;
  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  handleError = (err: HttpErrorResponse) => {
    let errorMessage = ' ';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    }

    if(err.status === 401) {
      errorMessage = `Your session has expired`;
      this.authService.logout()
      this.router.navigate(['/login']);
    }
    if (err) {
      errorMessage = `Server returned code:${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
