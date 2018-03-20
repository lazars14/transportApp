import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService extends Http {

  client: boolean;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private sessionService: SessionService) {
    super(backend, defaultOptions);
  }

  isClient(url: string) {
    const num = url.indexOf('client');
    // here check if url contains 'client', if it doesn't it will return -1
    if (num === -1) {
      this.client = false;
      return false;
    } else {
      this.client = true;
      return true;
    }
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }

      if (this.isClient(url)) {
        options.headers.set('x-access-token', this.sessionService.getClientToken());
        options.headers.set('from', this.sessionService.getClientEmail());
      } else {
        options.headers.set('x-access-token', this.sessionService.getManagerToken());
        options.headers.set('from', this.sessionService.getManagerEmail());
      }

    } else {

      // we have to add the token to the url object
      if (this.isClient(url.url)) {
        url.headers.set('x-access-token', this.sessionService.getClientToken());
        url.headers.set('from', this.sessionService.getClientEmail());
      } else {
        url.headers.set('x-access-token', this.sessionService.getManagerToken());
        url.headers.set('from', this.sessionService.getManagerEmail());
      }
    }
    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401 || error.status === 403) {
        // if (this.client) {
        //   this.sessionService.logout(true);
        // } else {
        //   this.sessionService.logout(false);
        // }
        if (this.client === true) {
          this.sessionService.destroyClient();
        } else {
          this.sessionService.destroyManager();
        }
      }

      return Observable.throw(error);
    });
  }

}
