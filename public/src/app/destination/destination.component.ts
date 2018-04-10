import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Destination, DestinationRequest, Vehicle, Driver } from '../_model/index';
import { DestinationService } from '../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';
import { DestinationRequestService, VehicleService, DriverService } from './../_services/index';
import * as _ from 'lodash';
import { constants } from './../utils/constants';

import { } from 'googlemaps';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { SetVehicleModalComponent } from '../set-vehicle-modal/set-vehicle-modal.component';
import { SetDriversModalComponent } from '../set-drivers-modal/set-drivers-modal.component';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor(private destinationService: DestinationService, private sessionService: SessionService,
    private router: Router, private destinationRequestService: DestinationRequestService, private vehicleService: VehicleService,
    private driverService: DriverService) { }

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(SetVehicleModalComponent) setVehicleModal: SetVehicleModalComponent;
  @ViewChild(SetDriversModalComponent) setDriversModal: SetDriversModalComponent;

  destination = new Destination();
  destinationRequest = new DestinationRequest();

  destinationRequests = [];
  preChangeDestinationRequests = [];
  openRequests = [];

  destinationOpen: boolean;
  remove: boolean;
  destinationRequestId: String;

  vehicle: Vehicle;
  vehicleInfo: string;

  drivers = [];
  driversInfo = '';

  totalCost = 0;
  ticketsIncome = 0;
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
      this.totalCost = data.numberOfKms / 100 * (data.fuelExpenses + 2 * data.driversPay);
      this.visible = true;
      const today = new Date();
      const startDate = new Date(this.destination.startDate);
      if (startDate.getTime() > today.getTime()) {
        this.destinationOpen = true;
      }

      if (this.destination.drivers.length > 0) {
        for (let i = 0; i < 2; i++) {
          this.driverService.findById(this.destination.drivers[i]).subscribe(driver => {
            this.driversInfo += driver.firstName + ' ' + driver.lastName;
            if (i === 0) {
              this.driversInfo += ', ';
            }
          }, error => {
            this.notification.error('Get Destination Drivers - Error ' + error.status + ' - ' + error.statusText);
          });
        }
      }

      this.destinationRequestService.findByDestination(id).subscribe(currentRequests => {
        this.destinationRequests = currentRequests;
        this.preChangeDestinationRequests = currentRequests;
      }, error => {
        this.notification.error('Get Destination Requests - Error ' + error.status + ' - ' + error.statusText);
      });

      this.destinationRequestService.findAllOpen().subscribe(openRequests => {
        this.openRequests = openRequests;
      }, error => {
        this.notification.error('Get Open Requests - Error ' + error.status + ' - ' + error.statusText);
      });

      if (this.destination.vehicleId) {
        this.vehicleService.findById(this.destination.vehicleId).subscribe(vehicle => {
          this.vehicleInfo = vehicle.name;
          this.vehicle = vehicle;
        }, error => {
          this.notification.error('Get Destination Vehicle - Error ' + error.status + ' - ' + error.statusText);
        });
      }


    }, error => {
      this.notification.error('Get Destination - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  loadDataForSetting(vehicle: boolean) {
    if (vehicle) {
      this.setVehicleModal.loadData();
    } else {
      this.setDriversModal.loadData();
    }
  }

  setVehicle(vehicle: Vehicle) {
    this.destinationService.setVehicle(this.destination._id, this.vehicle._id).subscribe(destination => {
      this.destination.vehicleId = vehicle._id;
      this.vehicleInfo = vehicle.name;
    }, error => {
      this.notification.error('Set Destination Vehicle - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  setDrivers(drivers: Array<Driver>) {
    this.destinationService.setDrivers(this.destination._id, this.drivers).subscribe(destination => {
      const driver1 = this.drivers[0];
      const driver2 = this.drivers[1];
      this.destination.drivers.push(driver1._id);
      this.destination.drivers.push(driver2._id);
      this.driversInfo = driver1.firstName + ' ' + driver1.lastName + ', ' + driver2.firstName + ' ' + driver2.lastName;
    }, error => {
      this.notification.error('Set Destination Vehicle - Error ' + error.status + ' - ' + error.statusText);
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
    // go through preChanged and destinationRequests
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
    this.destinationRequestService.reject(this.destinationRequest._id).subscribe(
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
