import { Component, OnInit, ViewChild } from '@angular/core';
import { Destination } from '../_model/index';
import { DestinationService } from '../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';
import * as _ from 'lodash';
import { constants } from './../utils/constants';

import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(DestinationModalComponent) destinationModal: DestinationModalComponent;

  openDestinations = [];
  inProgressDestinations = [];
  finishedDestinations = [];

  action: string;
  destination = new Destination();
  destinationId: string;

  deleteHeader = 'Delete Destination';
  deleteText = 'Are you sure you want to delete this destination?';

  constructor(private destinationService: DestinationService, private sessionService: SessionService) { }

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.resetLists();
    this.destinationService.findAllForManager().subscribe(data => {
      const today = new Date();
      _.forEach(data, (destination) => {
        const startDate = new Date(destination.startDate);
        const endDate = new Date(destination.endDate);
        if (startDate.getTime() < today.getTime() && endDate.getTime() < today.getTime()) {
          this.finishedDestinations.push(destination);
        } else if (startDate.getTime() < today.getTime() && endDate.getTime() > today.getTime()) {
          this.inProgressDestinations.push(destination);
        } else {
          this.openDestinations.push(destination);
        }
      });

    }, error => {
      this.notification.error('Get Destinations - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  resetLists() {
    this.openDestinations = [];
    this.inProgressDestinations = [];
    this.finishedDestinations = [];
  }

  modalAddUpdate() {
    if (this.action === constants.add) {
      this.add();
    } else {
      this.update();
    }
  }

  resetForm() {
    this.destination = new Destination();
    this.destination.startDate = new Date();
  }

  setAction(destination: Destination) {
    if (destination === null) {
      this.action = constants.add;
    } else {
      this.destination = _.cloneDeep(destination);
      this.destination.startDate = new Date(this.destination.startDate);
      this.destination.endDate = new Date(this.destination.endDate);
      this.destinationModal.setMapForEdit(this.destination);
      this.action = constants.update;
    }
  }

  setDeleteId(id: string) {
    console.log('setting id object');
    this.destinationId = id;
  }

  add() {
    console.log('add in destinations component');
    this.destinationService.create(this.destination).subscribe(
      result => {
        this.notification.success('Destination created successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.notification.error('Add Destination - Error ' + error.status + ' - ' + error.statusText);
      });
  }

  update() {
    console.log('update in destinations component');
    this.destinationService.update(this.destination).subscribe(
      result => {
        this.notification.success('Destination updated successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.notification.error('Update Destination - Error ' + error.status + ' - ' + error.statusText);
      });
  }

  delete() {
    this.destinationService.delete(this.destinationId).subscribe(
      result => {
        this.notification.success('Destination deleted successfuly');
        this.refreshPage();
      },
      error => {
        this.notification.error('Delete Destination - Error ' + error.status + ' - ' + error.statusText);
      });
  }

}
