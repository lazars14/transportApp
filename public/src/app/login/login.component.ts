import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { AuthService } from './../_services/index';
import { SessionService } from './../_core/index';
import { NotificationComponent } from './../notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  userType: string;
  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthService, private sessionService: SessionService) { }

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
    } else {
      this.userType = constants.client;
    }
  }

  onSubmit() {
    if (this.userType === constants.client) {
      // true because in login() - true is check if user is client
      this.authService.login(this.email, this.password, true)
      .subscribe(
        data => {
          this.sessionService.storeClient(data);
          this.router.navigate(['client/dashboard/drivers']);
        },
        error => {
          this.notification.error('Login Client - Error ' + error.status + ' - ' + error.statusText);
        });
    } else {
      // false because in login() - true is check if user is client
      this.authService.login(this.email, this.password, false)
      .subscribe(
        data => {
          this.sessionService.storeManager(data);
          this.router.navigate(['manager/dashboard/destinations']);
        },
        error => {
          this.notification.error('Login Client - Error ' + error.status + ' - ' + error.statusText);
        });
    }
  }

}
