import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { constants } from './../utils/constants';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  client: boolean;

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.fillUserType();
  }

  fillUserType() {
    const url = this.router.url;
    // url is /client/login or /manager/login
    const num = url.indexOf('client');
    // here check if url contains 'client', if it doesn't it will return -1
    if (num === -1) {
      this.client = false;
    } else {
      this.client = true;
    }
  }

  logout() {
    if (this.client) {
      this.sessionService.logout(true);
    } else {
      this.sessionService.logout(false);
    }
  }

}
