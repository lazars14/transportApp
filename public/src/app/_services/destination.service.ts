import { Injectable } from '@angular/core';
import { HttpService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Destination, Vehicle } from '../_model/index';

@Injectable()
export class DestinationService {

  constructor(private httpService: HttpService, private sessionService: SessionService) { }

  apiUrl: string = environment.apiUrl;

  findAllForManager() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinations')
    .map((res) => res.json());
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinations/' + id)
    .map((res) => res.json());
  }

  create(destination: Destination) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinations', destination)
    .map((res) => res.json());
  }

  update(destination: Destination) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinations/' +
     destination._id, destination)
    .map((res) => res.json());
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinations/' + id)
    .map((res) => res.json());
  }

  checkIfVehicleAvailable(vehicleId: string, startDate: Date, endDate: Date) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/vehicles/' + vehicleId + '/available',
    { startDate: startDate, endDate: endDate })
    .map((res) => res.json());
  }

}
