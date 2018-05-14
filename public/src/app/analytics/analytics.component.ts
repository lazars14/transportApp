import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinationService, DestinationRequestService, DriverService, VehicleService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { DirectionDirective } from '../_directives';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(DirectionDirective) directionDirective: DirectionDirective;

  constructor(private destinationService: DestinationService, private requestService: DestinationRequestService,
              private driverService: DriverService, private vehicleService: VehicleService) { }

  destinations = [];

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.destinationService.findAllFinishedClient().subscribe(finishedDestinationsResponse => {
      finishedDestinationsResponse.forEach(destination => {
        destination.visible = true;

        destination.driversInfo = '';
        for (let i = 0; i < 2; i++) {
          this.driverService.findById(destination.drivers[i]._id).subscribe(driver => {
            destination.driversInfo += driver.firstName + ' ' + driver.lastName;
            if (i === 0) {
              destination.driversInfo += ', ';
            }
          }, error => {
            this.notification.error('Get Destination Drivers - Error ' + error.status + ' - ' + error.statusText);
          });
        }

        this.vehicleService.findById(destination.vehicleId).subscribe(vehicle => {
          destination.vehicleInfo = vehicle.name;
        }, error => {
          this.notification.error('Get Destination Vehicle - Error ' + error.status + ' - ' + error.statusText);
        });

        this.requestService.findByDestinationClient(destination._id).subscribe(destinationRequests => {
          // draw route
          this.directionDirective.getWaypointsWithoutDuplicates(destinationRequests, [destination.startLocation, destination.endLocation])
          .then(waypoints => {
            this.directionDirective.drawDirection(waypoints);
          });

          destination.ticketsIncome = 0;
          for (let index = 0; index < destinationRequests.length; index++) {
            const request = destinationRequests[index];
            destination.ticketsIncome += request.distance * destination.requestPerKmPrice * (1 - request.discount / 100);
            if (index === destinationRequests.length - 1) {
              // set total cost and tickets income
              destination.totalCost = destination.numberOfKms / 100 * (destination.fuelExpenses + 2 * destination.driversPay);
              destination.total = destination.ticketsIncome - destination.totalCost;
            }
          }
        }, error => {
          this.notification.error('Get Destination Requests - Error ' + error.status + ' - ' + error.statusText);
        });
        this.destinations.push(destination);
      });
    }, error => {
      this.notification.error('Get Finished Destinations - Error ' + error.status + ' - ' + error.statusText);
    });
  }

}
