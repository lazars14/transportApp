import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { ClientService, ManagerService } from './../_services/index';
import { SessionService } from './../_core/index';
import { Client, Manager } from './../_model/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-update-cm-info',
  templateUrl: './update-cm-info.component.html',
  styleUrls: ['./update-cm-info.component.css']
})
export class UpdateCmInfoComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  userType: string;
  user: object;

  constructor(private router: Router, private sessionService: SessionService,
      private clientService: ClientService, private managerService: ManagerService) { }

  ngOnInit() {
    this.fillUserType();
  }

  fillUserType() {
    this.userType = this.router.url;
    // url is /client/login or /manager/login
    const num = this.userType.indexOf('client');
    // here check if url contains 'client', if it doesn't it will return -1
    if (num === -1) {
      this.userType = constants.manager;
      this.user = new Manager();
      this.user = this.sessionService.getManager();
    } else {
      this.userType = constants.client;
      this.user = new Client();
      this.user = this.sessionService.getClient();
    }
  }

  // method for converting user obj (doesn't have type) to client and manager object (needed for update in service)
  convertUserObject(client: boolean) {
    let obj;

    if (client) {
      obj = new Client();
    } else {
      obj = new Manager();
    }

    // tslint:disable-next-line:forin
    for (const prop in this.user) {
      obj[prop] = this.user[prop];
    }

    return obj;
  }

  ok() {
    if (this.userType === constants.client) {
      console.log('update client info');
      this.clientService.update(this.convertUserObject(true)).subscribe(
        data => {
          this.notification.success('Client updated successfuly');
          this.sessionService.setUpdatedClient(data);
        },
        error => {
          this.notification.error('Update Client - Error ' + error.status + ' - ' + error.statusText);
        });
    } else {
      console.log('update manager info');
      this.managerService.updateInfo(this.convertUserObject(false)).subscribe(
        data => {
          this.notification.success('Manager updated successfuly');
          this.sessionService.setUpdatedManager(data);
        },
        error => {
          this.notification.error('Update Manager - Error ' + error.status + ' - ' + error.statusText);
        });
    }
  }

}
