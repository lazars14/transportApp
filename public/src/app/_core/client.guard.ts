import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';

@Injectable()
export class ClientGuard implements CanActivate, CanActivateChild {

  constructor (private sessionService: SessionService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isClientLoggedIn()) {
      //   this._router.navigate(['/']);
      //   return false;
      // }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isClientLoggedIn()) {
      //   this._router.navigate(['client/login']);
      //   return false;
      // }
    return true;
  }
}
