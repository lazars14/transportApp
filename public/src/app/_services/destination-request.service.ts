import { Injectable } from '@angular/core';

import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { DestinationRequest, Destination } from '../_model/index';

@Injectable()
export class DestinationRequestService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByDestination(destinationId: string) {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + destinationId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByDestinationClient(destinationId: string) {
    return this.httpService.get(this.apiUrl + '/client/' + this.sessionService.getClientId() + '/destinationRequests/' + destinationId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findAllOpen() {
    return this.httpService.get(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/submitted')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(destinationRequest: DestinationRequest) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId() +
    '/destinationRequests', destinationRequest)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(destinationRequest: DestinationRequest) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() +
    '/destinationRequests/' + destinationRequest._id, destinationRequest)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: string) {
    return this.httpService.delete(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  submit(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' +
    id + '/setSubmitted', null)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  await(destinationRequest: DestinationRequest) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' +
    destinationRequest._id + '/setAwaiting', destinationRequest)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  accept(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id +
     '/setAccepted', null)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  reject(id: string) {
    return this.httpService.put(this.apiUrl + '/manager/' + this.sessionService.getManagerId() + '/destinationRequests/' + id +
     '/setRejected', null)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  updateRequestsToAwaiting(destinationRequests: Array<DestinationRequest>, destinationId: string) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId()
    + '/destinations/' + destinationId + '/updateRequests', {destinationRequests: destinationRequests})
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
