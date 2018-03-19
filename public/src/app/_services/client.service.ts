import { Injectable } from '@angular/core';
import { HttpService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Client } from '../_model/index';

@Injectable()
export class ClientService {

  constructor(private httpService: HttpService) {}

  apiUrl: string = environment.apiUrl;

  login(email: string, password: string) {
    return this.httpService.post(this.apiUrl + '/manager/login', {email, password}).map((res) => res.json());
  }

  update(client: Client) {
    return this.httpService.put(this.apiUrl + '/client/' + client._id, client)
    .map((res) => res.json());
  }

}
