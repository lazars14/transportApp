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
  DriverService,
  PushNotificationService
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
  Ng4LoadingSpinnerService
} from 'ng4-loading-spinner';
declare var google: any;

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor(private destinationService: DestinationService, private sessionService: SessionService,
    private router: Router, private destinationRequestService: DestinationRequestService, private vehicleService: VehicleService,
    private driverService: DriverService, private spinnerService: Ng4LoadingSpinnerService,
    private pushService: PushNotificationService) {}

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(SetVehicleModalComponent) setVehicleModal: SetVehicleModalComponent;
  @ViewChild(SetDriversModalComponent) setDriversModal: SetDriversModalComponent;
  @ViewChild(DirectionDirective) directionDirective: DirectionDirective;

  loading = true;

  destination = new Destination();
  destinationRequest = new DestinationRequest();

  destinationRequests = [];
  openRequests = [];
  requestsForRemoval = [];

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

  longestRouteReqId;

  visible = false;

  waypoints = [];
  alreadyAdded = [];

  deleteHeader = 'Reject Request';
  deleteText = 'Are you sure you want to reject this request?';

  deleteHeaderReject = 'Reject Request';
  deleteTextReject = 'Are you sure you want to reject this request?';

  deleteHeaderRemove = 'Remove Request';
  deleteTextRemove = 'Are you sure you want to remove the request?';

  ngOnInit() {
    this.destinationRequest.startLocation = {
      lat: 0,
      lng: 0
    };
    this.destinationRequest.endLocation = {
      lat: 0,
      lng: 0
    };
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
          const driverId = this.destination.drivers[i];
          this.driverService.findByIdManager(driverId['_id']).subscribe(driver => {
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
        if (this.destinationRequests.length > 0) {
          this.calculate();
        }
      }, error => {
        this.notification.error('Get Destination Requests - Error ' + error.status + ' - ' + error.statusText);
      });

      if (this.destinationOpen) {
        this.destinationRequestService.findAllOpen().subscribe(openRequests => {
          this.openRequests = openRequests;
        }, error => {
          this.notification.error('Get Open Requests - Error ' + error.status + ' - ' + error.statusText);
        });
      }

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
    this.destinationRequest = destinationRequest;
  }

  resetLocation() {
    this.destinationRequest = new DestinationRequest();
  }

  addToDestination(destinationRequest: DestinationRequest) {
    // add to destinationRequests
    this.destinationRequests.push(destinationRequest);
    // remove from open requests
    const index = this.openRequests.indexOf(destinationRequest);
    this.openRequests.splice(index, 1);
  }

  canAddRequest(userId: string) {
    const destinationRequestsWithUserId = this.destinationRequests.find(request => request.userId === userId);

    if (destinationRequestsWithUserId !== undefined) {
      return false;
    } else {
      return true;
    }
  }

  findRequestForRemoval(waypointLocation, waypoints) {
    return new Promise(async (resolve, reject) => {
      const found = await this.destinationRequests.find(x => _.isEqual(x.startLocation, waypointLocation) ||
        _.isEqual(x.endLocation, waypointLocation));
      resolve(found);
    });
  }

  calculate() {
    this.spinnerService.show();
    this.waypoints = [];
    this.total = 0;
    this.totalCost = 0;
    this.ticketsIncome = 0;
    this.alreadyAdded = [this.destination.startLocation, this.destination.endLocation];

    // remove duplicate locations
    this.directionDirective.getWaypointsWithoutDuplicates(this.destinationRequests, this.alreadyAdded)
      .then(waypoints => {
        this.directionDirective.calculateBestRoute(waypoints);
      });


  }

  async calculateDistancesAndTimes($event) {
    this.waypoints = $event.waypoints;

    this.destination.numberOfKms = $event.distance;

    const startDate = new Date(this.destination.startDate);
    this.destination.endDate = new Date(startDate.getTime() + $event.duration * 1000);

    // remove from current requests
    const requestToRemove = $event.requestToRemove;
    const location = {
      lat: parseFloat(requestToRemove.location.location.lat().toFixed(4)),
      lng: parseFloat(requestToRemove.location.location.lng().toFixed(4))
    };
    const found = await this.findRequestForRemoval(location, $event.waypoints);
    this.longestRouteReqId = found['_id'];

    const legs = $event.legs.routes[0].legs;

    const legsDetails = [];

    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      legsDetails.push({
        index: i,
        startLocation: {
          lat: parseFloat(leg.start_location.lat().toFixed(4)),
          lng: parseFloat(leg.start_location.lng().toFixed(4))
        },
        endLocation: {
          lat: parseFloat(leg.end_location.lat().toFixed(4)),
          lng: parseFloat(leg.end_location.lng().toFixed(4))
        },
        duration: leg.duration.value,
        distance: leg.distance.value
      });
    }

    for (let ii = 0, pr = Promise.resolve({}); ii < this.destinationRequests.length; ii++) {
      pr = pr.then(() => new Promise(async (res) => {
        const requestData = await this.getDataForRequest(this.destinationRequests[ii], legsDetails);
        if (ii === this.destinationRequests.length - 1) {
          // set destination result (finance)
          this.totalCost = this.destination.numberOfKms / 100 * (this.destination.fuelExpenses + 2 * this.destination.driversPay);
          this.total = this.ticketsIncome - this.totalCost;

          // draw map
          this.directionDirective.drawDirection($event.waypoints);

          this.sortDestinationRequests();

          this.spinnerService.hide();
        }
        res();
      }));
    }


  }

  sortDestinationRequests() {
    this.destinationRequests.sort((a: DestinationRequest, b: DestinationRequest) => a.destinationOrder < b.destinationOrder ? -1 : 1);
  }

  getDataForRequest(request, legsDetails) {
    return new Promise(async (resolve, reject) => {
      const start = await legsDetails.find(leg => _.inRange(request.startLocation.lat, leg.startLocation.lat - 0.001,
        leg.startLocation.lat + 0.001) && _.inRange(leg.startLocation.lng, leg.startLocation.lng - 0.001,
        leg.startLocation.lng + 0.001));
      const startLegIndex = legsDetails.indexOf(start);

      const dataBeforeRoute = await this.getDataBeforeRequest(startLegIndex, legsDetails);

      // set request start date
      const startDate = new Date(this.destination.startDate);
      const startTimeInSeconds = startDate.getTime() / 1000 + dataBeforeRoute['duration'];
      request.startDate = new Date(startTimeInSeconds * 1000);

      const end = await legsDetails.find(leg => _.inRange(request.endLocation.lat, leg.endLocation.lat - 0.0005,
        leg.endLocation.lat + 0.0005) && _.inRange(leg.endLocation.lng, leg.endLocation.lng - 0.0005,
        leg.endLocation.lng + 0.0005));
      const endLegIndex = legsDetails.indexOf(end);

      const routeData = await this.getRouteData(startLegIndex, endLegIndex, legsDetails);

      // set request distance
      request.distance = routeData['distance'] / 1000;

      // set request start date
      const endTimeInSeconds = startTimeInSeconds + routeData['duration'];
      request.endDate = new Date(endTimeInSeconds * 1000);

      // set request destination order
      request.destinationOrder = startLegIndex;

      // set request price
      request.price = request.distance * this.destination.requestPerKmPrice * (1 - request.discount / 100);
      this.ticketsIncome += request.price;

      resolve({
        dataBeforeRoute: dataBeforeRoute,
        routeData: routeData
      });
    });
  }

  getDataBeforeRequest(startLegIndex, legsDetails) {
    return new Promise(async (resolve, reject) => {
      const filteredBefore = await legsDetails.filter(leg => leg.index < startLegIndex);
      const durationSum = _.sumBy(filteredBefore, 'duration');
      const distanceSum = _.sumBy(filteredBefore, 'distance');
      resolve({
        duration: durationSum,
        distance: distanceSum
      });
    });
  }

  getRouteData(startLegIndex, endLegIndex, legsDetails) {
    return new Promise(async (resolve, reject) => {
      const filteredRoute = await legsDetails.filter(leg => leg.index >= startLegIndex && leg.index <= endLegIndex);
      const durationSum = _.sumBy(filteredRoute, 'duration');
      const distanceSum = _.sumBy(filteredRoute, 'distance');
      resolve({
        duration: durationSum,
        distance: distanceSum
      });
    });
  }

  save() {
    if (this.destinationRequests.length > 0) {
      this.destinationRequestService.updateRequestsToAwaiting(this.destinationRequests, this.destination._id)
        .subscribe(async requests => {
          // everything ok

          if (this.requestsForRemoval.length > 0) {
            this.removeItems();
          } else {
            this.notification.success('Update Destination Requests - Success');
            const destRequests = _.cloneDeep(this.destinationRequests);
            await this.sendPushNotifications(destRequests, 'You have a request that is awaiting your confirmation!');
            this.reloadData();
          }

        }, error => {
          this.notification.error('Update Destination Requests - Error ' + error.status + ' - ' + error.statusText);
          this.reloadData();
        });
    } else {
      this.removeItems();
    }

  }

  sendPushNotifications(destinationRequests, message) {
    for (let index = 0; index < destinationRequests.length; index++) {
      const request = destinationRequests[index];
      this.pushService.sendNotification(request.userId, message, request._id)
        .subscribe(data => {

        }, error => {
          this.notification.error('Send Push Notification - Error ' + error.status + ' - ' + error.statusText);
        });
    }
  }

  removeItems() {
    let processedItems = 0;
    // now set the status of the removed requests to submitted (if they're not rejected by user)
    for (let index = 0; index < this.requestsForRemoval.length; index++) {
      const idForRemoval = this.requestsForRemoval[index];
      this.destinationRequestService.submit(idForRemoval)
        .subscribe(request => {
          processedItems++;
          if (processedItems === this.requestsForRemoval.length) {
            this.notification.success('Update Destination Requests - Success');
            this.reloadData();
          }
        }, error => {
          this.notification.error('Set Request To Submitted - Error ' + error.status + ' - ' + error.statusText);
        });
    }
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
    // add request to open destinationRequests
    this.openRequests.push(this.destinationRequest);
    this.requestsForRemoval.push(this.destinationRequest._id);
    // remove from destinationRequests
    const index = this.destinationRequests.indexOf(this.destinationRequest);
    this.destinationRequests.splice(index, 1);
  }

  rejectRequest() {
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
    this.requestsForRemoval = [];
    this.refreshPage();
    this.waypoints = [];
    this.directionDirective.drawDirection(this.waypoints);
  }

}
