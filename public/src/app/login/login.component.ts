import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { AuthService } from './../_services/index';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType: string;
  email: string;
  password: string;
  error: any;

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
      this.authService.login(this.email, this.password, true)
      .subscribe(
        data => {
          this.sessionService.storeClient(data);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = JSON.parse(error.body);
          // display alert error
        });
    } else {
      this.authService.login(this.email, this.password, false)
      .subscribe(
        data => {
          this.sessionService.storeClient(data);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = JSON.parse(error.body);
          // display alert error
        });
    }
  }

}
