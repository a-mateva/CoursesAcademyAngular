import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('courses/list');
    }
    
    return true;
  }
}
