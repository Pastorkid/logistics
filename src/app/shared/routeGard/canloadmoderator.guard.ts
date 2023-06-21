import { Injectable } from '@angular/core';
import { CanLoad, Route,Router,UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CanloadmoderatorGuard implements CanLoad {
  token = this.authService.decodeToken();
  userDetails: any=this.token;
  constructor(  private authService: AuthService,private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userDetails.role=='SUPER_ADMIN'){
      return true
}  
else{
  this.router.navigate(['/board']);
  return false 
}
  }
  
  
}
