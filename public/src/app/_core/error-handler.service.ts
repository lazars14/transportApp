import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

  constructor(private router: Router) { }

  public handleError(error: Response) {
    const httpErrorCode = error.status;
    if (httpErrorCode === 403) {
      const userType = this.router.url;
      // url contains client or manager
      const num = userType.indexOf('client');
      // here check if url contains 'client', if it doesn't it will return -1
      if (num === -1) {
        // manager
        this.router.navigate(['manager']);
      } else {
        // client
        this.router.navigate(['client']);
      }
    } else if (httpErrorCode === 401) {
      // no token, go to main page
      this.router.navigate(['/']);
    }

    return Observable.throw(error);
  }

}
