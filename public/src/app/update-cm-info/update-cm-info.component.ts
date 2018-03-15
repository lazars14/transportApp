import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { ClientService, ManagerService } from './../_services/index';
import { SessionService } from './../_core/index';
import { Client, Manager } from './../_model/index';

@Component({
  selector: 'app-update-cm-info',
  templateUrl: './update-cm-info.component.html',
  styleUrls: ['./update-cm-info.component.css']
})
export class UpdateCmInfoComponent implements OnInit {

  userType: string;
  user: object;

  constructor(private router: Router, private sessionService: SessionService) { }

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
      // this.user = this.sessionService.getManager();
    } else {
      this.userType = constants.client;
      this.user = new Client();
      // this.user = this.sessionService.getClient();
    }
  }

  ok() {
    if (this.userType === constants.client) {
      console.log('update client info');
    } else {
      console.log('update manager info');
    }
  }

}
