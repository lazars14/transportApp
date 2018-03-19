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

  create(expense: VehicleExpense) {
    return this.httpService.post(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + expense.vehicleId + '/vehicleExpenses', expense)
    .map((res) => res.json());
  }

  update(expense: VehicleExpense) {
    return this.httpService.put(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + expense.vehicleId + '/vehicleExpenses/' + expense._id, expense)
    .map((res) => res.json());
  }

  delete(expenseid: string, vehicleid: string) {
    return this.httpService.delete(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/vehicles/'
    + vehicleid + '/vehicleExpenses/' + expenseid)
    .map((res) => res.json());
  }

}
