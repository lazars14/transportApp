import { Injectable } from '@angular/core';

import { HttpService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Manager } from '../_model/index';

@Injectable()
export class ManagerService {

  constructor(private httpService: HttpService, private sessionService: SessionService) {}

  apiUrl: string = environment.apiUrl;

  login(email: string, password: string) {
    return this.httpService.post(this.apiUrl + '/client/login', {email, password})
    .map((res) => res.json());
  }

  findAll() {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers')
    .map((res) => res.json());
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + id)
    .map((res) => res.json());
  }

  create(manager: Manager) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers', manager)
    .map((res) => res.json());
  }

  update(manager: Manager) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + manager._id, manager)
    .map((res) => res.json());
  }

  updateInfo(manager: Manager) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId(), manager)
    .map((res) => res.json());
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/managers/' + id)
    .map((res) => res.json());
  }

}
