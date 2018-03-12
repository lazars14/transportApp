import { Injectable } from '@angular/core';

import { HttpService, SessionService } from '../_core/index';
import { ClientService, ManagerService } from '../_services/index';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService, private sessionService: SessionService, private clientService: ClientService,
     private managerService: ManagerService) { }

  login(email: string, password: string, client: boolean) {
    if (client) {
      return this.clientService.login(email, password);
    } else {
      return this.managerService.login(email, password);
    }
  }

  logout(client: boolean) {
    if (client) {
      this.sessionService.destroyClient();
    } else {
      this.sessionService.destroyManager();
    }
  }

}
