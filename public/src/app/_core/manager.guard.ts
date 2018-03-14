import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';

@Injectable()
export class ManagerGuard implements CanActivate, CanActivateChild {

  constructor(private sessionService: SessionService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // if (!this.sessionService.isManagerLoggedIn()) {
      //   this._router.navigate(['/']);
      //   return false;
      // }

    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // if (!this.sessionService.isManagerLoggedIn()) {
      //   this._router.navigate(['/manager/login']);
      //   return false;
      // }

    return true;
  }
}
