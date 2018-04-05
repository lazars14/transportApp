import { Injectable } from '@angular/core';

import { HttpService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Driver } from '../_model/index';

@Injectable()
export class DriverService {

  constructor(private httpService: HttpService, private sessionService: SessionService) { }

  apiUrl: string = environment.apiUrl;

  findAllManager() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/drivers')
    .map((res) => res.json());
  }

  findAll() {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/drivers')
    .map((res) => res.json());
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/drivers/' + id)
    .map((res) => res.json());
  }

  create(driver: Driver) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/drivers', driver)
    .map((res) => res.json());
  }

  update(driver: Driver) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/drivers/' + driver._id, driver)
    .map((res) => res.json());
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/drivers/' + id)
    .map((res) => res.json());
  }

}
