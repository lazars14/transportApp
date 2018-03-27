import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Destination } from '../_model/index';
import { DestinationService } from '../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';
import * as _ from 'lodash';
import { constants } from './../utils/constants';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor(private destinationService: DestinationService, private sessionService: SessionService, private router: Router) { }

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  destination = new Destination();
  destinationFinished: boolean;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    const urlString = this.router.url;
    const urlArray = urlString.split('/');
    const id = urlArray[urlArray.length - 1];
    this.destinationService.findById(id).subscribe(data => {
      this.destination = data;
      const endDate = new Date(this.destination.endDate);
      if (endDate.getTime() < new Date().getTime()) {
        this.destinationFinished = true;
      }
    }, error => {
      this.notification.error('Get Destinations - Error ' + error.status + ' - ' + error.statusText);
    });
  }

}
