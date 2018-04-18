import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Destination,
  DestinationRequest,
  Vehicle,
  Driver
} from '../_model/index';
import {
  DestinationService
} from '../_services/index';
import {
  NotificationComponent
} from '../notification/notification.component';
import {
  SessionService
} from './../_core/index';
import {
  DestinationRequestService,
  VehicleService,
  DriverService
} from './../_services/index';
import * as _ from 'lodash';
import {
  constants
} from './../utils/constants';

import {} from 'googlemaps';
import {
  MapsAPILoader,
  AgmMap,
  GoogleMapsAPIWrapper,
  LatLng
} from '@agm/core';
import {
  SetVehicleModalComponent
} from '../set-vehicle-modal/set-vehicle-modal.component';
import {
  SetDriversModalComponent
} from '../set-drivers-modal/set-drivers-modal.component';
import {
  DirectionDirective
} from '../_directives/index';
import {
  Observable
} from 'rxjs/Observable';
import {
  Subject
} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
declare var google: any;

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor(private destinationService: DestinationService, private sessionService: SessionService,
    private router: Router, private destinationRequestService: DestinationRequestService, private vehicleService: VehicleService,
    private driverService: DriverService) {}

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(SetVehicleModalComponent) setVehicleModal: SetVehicleModalComponent;
  @ViewChild(SetDriversModalComponent) setDriversModal: SetDriversModalComponent;
  @ViewChild(DirectionDirective) directionDirective: DirectionDirective;

  loading = true;

  destination = new Destination();
  destinationRequest = new DestinationRequest();

  destinationRequests = [];
  openRequests = [];

  preChangeDestinationRequests = [];

  destinationOpen: boolean;
  remove: boolean;
  destinationRequestId: String;

  vehicle = new Vehicle();
  drivers = [];

  vehicleInfo: string;

  driversInfo = '';

  totalCost = 0;
  ticketsIncome = 0;
  total = 0;

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
          this.driverService.findByIdManager(this.destination.drivers[i]).subscribe(driver => {
            this.driversInfo += driver.firstName + ' ' + driver.lastName;
            this.drivers.push(driver);
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
        this.vehicleService.findByIdManager(this.destination.vehicleId).subscribe(vehicle => {
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

  setVehicle($event) {
    this.destinationService.setVehicle(this.destination._id, $event._id, this.destination.startDate, this.destination.endDate)
      .subscribe(destination => {
        this.destination.vehicleId = $event._id;
        this.vehicleInfo = $event.name;
        this.notification.success('Destination vehicle set succesfully');
      }, error => {
        this.notification.error('Set Destination Vehicle - Error ' + error.status + ' - ' + error.statusText);
      });
  }

  setDrivers($event) {
    const driversArray = [$event[0]._id, $event[1]._id];
    this.destinationService.setDrivers(this.destination._id, driversArray, this.destination.startDate, this.destination.endDate)
      .subscribe(destination => {
        this.destination.drivers = driversArray;
        this.driversInfo = $event[0].firstName + ' ' + $event[0].lastName + ', ' + $event[1].firstName + ' ' + $event[1].lastName;
        this.notification.success('Destination vehicle set succesfully');
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

    this.destinationRequests.forEach(request => {

      console.log('item');
      console.log('request ', request);
      this.waypoints.push({
        location: new google.maps.LatLng(request.startLocation.lat, request.startLocation.lng),
        stopover: true
        // destinationRequestId: request._id
      });
      console.log('start location lat: ' + request.startLocation.lat);
      console.log('start location lng: ' + request.startLocation.lng);

      this.waypoints.push({
        location: new google.maps.LatLng(request.endLocation.lat, request.endLocation.lng),
        stopover: true
        // destinationRequestId: request._id
      });
      console.log('end location lat: ' + request.endLocation.lat);
      console.log('end location lng: ' + request.endLocation.lng);

    });

    console.log('waypoints ', this.waypoints);
    // this.directionDirective.calculateBestRoute(this.waypoints).then(data => console.log('This is data from rpomises: ', data));
    this.directionDirective.calculateBestRoute(this.waypoints);

    // let promise = new Promise((resolve, reject) => {
    //   console.log('do something');
    // });

    // // works
    // for (let i = 0, p = Promise.resolve({}); i < 10; i++) {
    //   p = p.then(() => new Promise(resolve =>
    //     setTimeout(function () {
    //       console.log(1);
    //       resolve();
    //   }, 1000)
    //   ));
    // }
  }

  calculateDistancesAndTimes($event) {
    console.log('passed event ', $event);

    this.destination.numberOfKms = $event.distance;
    // duration is $event.duration (in seconds)

    // remove from current requests
    const requestToRemove = $event.requestToRemove;
    const fixedRequest = {startLocation: { lat: requestToRemove.startLocation.location.lat(),
       lng: requestToRemove.startLocation.location.lng()},
    endLocation: { lat: requestToRemove.endLocation.location.lat(), lng: requestToRemove.endLocation.location.lng()} };
    fixedRequest.startLocation.lat = parseFloat(fixedRequest.startLocation.lat.toFixed(4));
    fixedRequest.startLocation.lng = parseFloat(fixedRequest.startLocation.lng.toFixed(4));
    fixedRequest.endLocation.lat = parseFloat(fixedRequest.endLocation.lat.toFixed(4));
    fixedRequest.endLocation.lng = parseFloat(fixedRequest.endLocation.lng.toFixed(4));
    console.log('fixed request ', fixedRequest);
    console.log('last request ', this.destinationRequests[3]);
    const found = this.destinationRequests.find( x => _.isEqual(x.startLocation, fixedRequest.startLocation) &&
    _.isEqual(x.endLocation, fixedRequest.endLocation) );
      console.log('this is found before deletion ', found);
    const index = this.destinationRequests.indexOf(found);
    this.destinationRequests.splice(index, 1);

    console.log('this is found ', found);

    // add to open
    this.openRequests.push(found);


    const legs = $event.legs.routes[0].legs;
    console.log('legs in destination ', legs);

    this.destinationRequests.forEach(req => {
      console.log('request start location lat ', req.startLocation.lat);
      console.log('request start location lng ', req.startLocation.lng);

      console.log('request end location lat ', req.endLocation.lat);
      console.log('request end location lng ', req.endLocation.lng);
    });

    legs.forEach(leg => {
      console.log('leg start location lat ', parseFloat(leg.start_location.lat().toFixed(4)));
      console.log('leg start location lng ', parseFloat(leg.start_location.lng().toFixed(4)));

      const obj = {lat: parseFloat(leg.start_location.lat().toFixed(4)), lng: parseFloat(leg.start_location.lng().toFixed(4))};

      console.log('found leg start location ', this.destinationRequests.find(x => _.isEqual(x.startLocation, obj)));

      console.log('leg end location lat ', parseFloat(leg.end_location.lat().toFixed(4)));
      console.log('leg end location lng ', parseFloat(leg.end_location.lng().toFixed(4)));
    });

    // update requests
    this.destinationRequests.forEach(element => {
      // set all to awaiting (if not accepted and start date or end date have changed)
    });

    this.ticketsIncome = 0;
    this.destinationRequests.forEach(request => {
      if (request.status === constants.status.ACCEPTED) {
        const originalRequest = this.preChangeDestinationRequests.find(x => x._id === request._id);
        if (originalRequest.startDate !== request.startDate || originalRequest.endDate !== request.endDate) {
          request.discount += 5;
        }
      }
      this.ticketsIncome += request.price * (1 - request.discount / 100);
    });

    this.totalCost = this.destination.numberOfKms / 100 * (this.destination.fuelExpenses + 2 * this.destination.driversPay);
    this.total = this.ticketsIncome - this.totalCost;

    // draw map
    this.directionDirective.drawDirection($event.waypoints);
  }

  placeMarker($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  save() {
    console.log('saving changes');

    // go through preChanged and destinationRequests
    _.this.preChangeDestinationRequests.forEach(request => {
      const destinationRequest = _.find(this.destinationRequests, {
        _id: request._id
      });

      // request removed from destination, now will set status to submitted
      if (destinationRequest == null) {
        this.destinationRequestService.submit(destinationRequest._id).subscribe(destRequest => {
          // add request to open requests
          this.openRequests.push(destRequest);
          // remove request from current requests
          const index = this.destinationRequests.indexOf(this.destinationRequest);
          this.destinationRequests.splice(index, 1);

          // push notification?
        }, error => {
          this.notification.error('Set Destination Request Submitted - Error ' + error.status + ' - ' + error.statusText);
        });
      } else {
        // found request

        // status: Accepted
        if (destinationRequest.status === constants.status.ACCEPTED) {
          // check if status accepted and startDate and endDate changed
        // if any changed, give discount
          destinationRequest.discount += 5;
        }

        this.destinationRequestService.await(destinationRequest).subscribe(req => {
          // send push notification
        }, error => {
          this.notification.error('Set Destination Request Await - Error ' + error.status + ' - ' + error.statusText);
        });
      }


    });

    // atomicity in mongo - procedure?
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

  reloadData() {
    this.refreshPage();
  }

}
