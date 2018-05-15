import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  login(email: string, password: string, client: boolean) {
    if (client) {
      return this.httpService.post(this.apiUrl + '/client/login', {email, password})
      .map((res) => res.json())
      .catch(err => this.errorHandlerService.handleError(err));
    } else {
      return this.httpService.post(this.apiUrl + '/manager/login', {email, password})
      .map((res) => res.json())
      .catch(err => this.errorHandlerService.handleError(err));
    }
  }

  logout(client: boolean) {
    if (client) {
      this.sessionService.destroyClient();
    } else {
      this.sessionService.destroyManager();
    }
  }

}
