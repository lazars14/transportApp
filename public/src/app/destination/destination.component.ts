import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Destination, DestinationRequest } from '../_model/index';
import { DestinationService } from '../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';
import { DestinationRequestService } from './../_services/index';
import * as _ from 'lodash';
import { constants } from './../utils/constants';

import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor(private destinationService: DestinationService, private sessionService: SessionService,
    private router: Router, private destinationRequestService: DestinationRequestService) { }

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  destination = new Destination();
  destinationRequest = new DestinationRequest();

  destinationRequests = new Array<DestinationRequest>();
  preChangeDestinationRequests: Array<DestinationRequest>;
  openRequests = new Array<DestinationRequest>();

  destinationOpen: boolean;
  remove: boolean;
  destinationRequestId: String;

  ticketsIncome: Number;
  // ili da ga dobijem iz html-a - kao zbir svih cena iz request-ova

  lat = 0;
  lng = 0;

  visible = false;

  waypoints = [];

  deleteHeader = 'Reject Request';
  deleteText = 'Are you sure you want to reject this request?';

  deleteHeaderReject = 'Reject Request';
  deleteTextReject = 'Are you sure you want to reject this request?';

  deleteHeaderRemove = 'Remove Request';
  deleteTextRemove = 'Are you sure you want to remove the request?';

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    const urlString = this.router.url;
    const urlArray = urlString.split('/');
    const id = urlArray[urlArray.length - 1];
    this.destinationService.findById(id).subscribe(data => {
      this.destination = data;
      this.visible = true;
      const today = new Date();
      const startDate = new Date(this.destination.startDate);
      if (startDate.getTime() > today.getTime()) {
        this.destinationOpen = true;
      }

      // load current requests and save to preChange and destinationRequests
    }, error => {
      this.notification.error('Get Destinations - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  setLocation(destinationRequest: DestinationRequest) {
    console.log('setting location');
    this.destinationRequest = destinationRequest;
  }

  resetLocation() {
    this.destinationRequest = new DestinationRequest();
  }

  addToDestination(destinationRequest: DestinationRequest) {
    console.log('adding to destination');
    // add to destinationRequests
    this.destinationRequests.push(destinationRequest);
    // remove from open requests
    const index = this.openRequests.indexOf(destinationRequest);
    this.openRequests.splice(index, 1);
  }

  calculate() {
    console.log('calculating');
  }

  save() {
    console.log('saving changes');
    // go thround preChanged and destinationRequests
    // compare them, and save the changes (change statuses, add/delete neccessary, send push notifications)
    // if one fails, all fail
  }

  setDeleteId(destinationRequest: DestinationRequest, remove: boolean) {
    if (remove) {
      this.deleteHeader = this.deleteHeaderRemove;
      this.deleteText = this.deleteTextRemove;
      this.remove = true;
    } else {
      this.deleteHeader = this.deleteHeaderReject;
      this.deleteText = this.deleteTextReject;
      this.remove = false;
    }

    this.destinationRequest = destinationRequest;

  }

  delete() {
    if (this.remove) {
      this.removeRequest();
    } else {
      this.rejectRequest();
    }
  }

  removeRequest() {
    console.log('removing request');
    // add request to open destinationRequests
    this.openRequests.push(this.destinationRequest);
    // remove from destinationRequests
    const index = this.destinationRequests.indexOf(this.destinationRequest);
    this.destinationRequests.splice(index, 1);
  }

  rejectRequest() {
    console.log('rejecting request');
    this.destinationRequestService.reject(this.destination._id).subscribe(
      result => {
        this.notification.success('DestinationRequest rejected successfuly');
        // remove it from view
        const index = this.openRequests.indexOf(this.destinationRequest);
        this.openRequests.splice(index, 1);
      },
      error => {
        this.notification.error('Reject DestinationRequest - Error ' + error.status + ' - ' + error.statusText);
      });

  }

  // drawPolyline() {
  //   console.log('this should draw a polylyne');

  //   const polylines = [
  //     {
  //       latitude:  39.8282,
  //       longitude: -98.5795,
  //       speed: 50
  //   },
  //    {
  //       latitude:  38.8282,
  //       longitude: -108.5795,
  //       speed: 50
  //   }
  //   ];


  // }

}
