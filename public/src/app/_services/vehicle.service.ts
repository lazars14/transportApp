import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Vehicle } from '../_model/index';

@Injectable()
export class VehicleService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findAllManager() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByIdManager(id: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(vehicle: Vehicle) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles', vehicle)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(vehicle: Vehicle) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/' + vehicle._id, vehicle)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  extendRegistration(vehicle: Vehicle) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/' + vehicle._id +
    '/extendRegistration', { licensePlate: vehicle.licensePlate, licenseExpireDate: vehicle.licenseExpireDate })
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
