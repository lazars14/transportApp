import { Injectable } from '@angular/core';

import { HttpService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { DestinationRequest } from '../_model/index';

@Injectable()
export class DestinationRequestService {

  constructor(private httpService: HttpService, private sessionService: SessionService) { }

  apiUrl: string = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests')
    .map((res) => res.json());
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id)
    .map((res) => res.json());
  }

  create(destinationRequest: DestinationRequest) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId() +
    '/destinationRequests', destinationRequest)
    .map((res) => res.json());
  }

  update(destinationRequest: DestinationRequest) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() +
    '/destinationRequests/' + destinationRequest._id, destinationRequest)
    .map((res) => res.json());
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id)
    .map((res) => res.json());
  }

  await(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id +
     '/setAwaiting', null)
    .map((res) => res.json());
  }

  accept(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id +
     '/setAccepted', null)
    .map((res) => res.json());
  }

  reject(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id +
     '/setRejected', null)
    .map((res) => res.json());
  }

}
