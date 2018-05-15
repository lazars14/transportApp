import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Manager } from '../_model/index';

@Injectable()
export class ManagerService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) {}

  apiUrl: string = environment.apiUrl;

  login(email: string, password: string) {
    return this.httpService.post(this.apiUrl + '/client/login', {email, password})
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findAll() {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(manager: Manager) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers', manager)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(manager: Manager) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + manager._id, manager)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  updateInfo(manager: Manager) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId(), manager)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
