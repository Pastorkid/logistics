import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class canLoadGuardLogin implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/board']);
          return false;
        }
        return true;
      })
    );
  }
}
