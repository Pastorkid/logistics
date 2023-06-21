import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class canActivateGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    this.authService.checkTokenExpiration()
    
    return this.authService.isLoggedIn.pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn ) {
          this.router.navigate(['/login']);
          return false;
        }
        if(this.authService.checkTokenExpiration()) {
          this.authService.logout()
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
    
  }
}
