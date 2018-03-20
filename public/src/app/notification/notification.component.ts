import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService, ToasterConfig, Toast} from 'angular2-toaster';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    animation: 'fade'
  });

  toast: Toast = {
    type: 'info',
    title: 'Here is a Toast Title',
    body: 'Here is a Toast Body',
    timeout: 2000
  };

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {}

  success(message: string) {

    this.toast.type = 'success';
    this.toast.title = 'Success';
    this.toast.body = message;
    this.toasterService.pop(this.toast);
  }

  error(message: string) {

    this.toast.type = 'error';
    this.toast.title = 'Error';
    this.toast.body = message;
    this.toasterService.pop(this.toast);
  }

}
