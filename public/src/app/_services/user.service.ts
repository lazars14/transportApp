import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { User } from '../_model/index';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/users')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/users/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
