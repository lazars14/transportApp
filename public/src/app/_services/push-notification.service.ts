import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, SessionService, ErrorHandlerService } from '../_core/index';

@Injectable()
export class PushNotificationService {

  constructor(private httpService: HttpService, private sessionService: SessionService,
              private errorHandlerService: ErrorHandlerService) { }

  apiUrl: string = environment.apiUrl;

  sendNotification(userId: string, message: string, requestId: string) {
    return this.httpService.post(this.apiUrl + '/manager/' + this.sessionService.getManagerId + '/sendNotification',
    {userId, message, requestId})
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
