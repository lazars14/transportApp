import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Vehicle, VehicleExpense } from '../_model/index';

@Injectable()
export class VehicleExpenseService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  findAllForVehicle(vehicleId: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/expenses')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findAllForVehicleManager(vehicleId: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/'
    + vehicleId + '/expenses')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(expenseId: string, vehicleId: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/expenses/' + expenseId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(expense: VehicleExpense) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/'
    + expense.vehicleId + '/expenses', expense)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(expense: VehicleExpense) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/'
    + expense.vehicleId + '/expenses/' + expense._id, expense)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(expenseid: string, vehicleid: string) {
    return this.httpService.delete(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/'
    + vehicleid + '/expenses/' + expenseid)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
