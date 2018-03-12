import { Injectable } from '@angular/core';

import { HttpService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Vehicle, VehicleExpense } from '../_model/index';

@Injectable()
export class VehicleExpenseService {

  constructor(private httpService: HttpService, private sessionService: SessionService) { }

  apiUrl: string = environment.apiUrl;

  findAllForVehicle(vehicleId: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/vehicleExpenses')
    .map((res) => res.json());
  }

  findById(expenseId: string, vehicleId: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/vehicleExpenses/' + expenseId)
    .map((res) => res.json());
  }

  create(vehicleId: string, expense: VehicleExpense) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/vehicleExpenses', expense)
    .map((res) => res.json());
  }

  update(expenseId: string, vehicleId: string, expense: VehicleExpense) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/vehicleExpenses/' + expenseId, expense)
    .map((res) => res.json());
  }

  delete(expenseId: string, vehicleId: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleId + '/vehicleExpenses/' + expenseId)
    .map((res) => res.json());
  }

}
