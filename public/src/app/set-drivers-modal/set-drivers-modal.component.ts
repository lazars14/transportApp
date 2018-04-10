import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DriverService, DestinationService } from './../_services/index';
import { NotificationComponent } from './../notification/notification.component';
import { Destination } from './../_model/index';

@Component({
  selector: 'app-set-drivers-modal',
  templateUrl: './set-drivers-modal.component.html',
  styleUrls: ['./set-drivers-modal.component.css']
})
export class SetDriversModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() destination: Destination;

  drivers = [];

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.driverService.findAllManager().subscribe(data => {
      this.drivers = data;
      console.log(data);
      this.drivers.forEach(element => {
        console.log(element);
      });
    }, error => {
      this.notification.error('Get All Drivers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  checkDriver(driverId: string) {
    if (this.destination.drivers[0] === driverId || this.destination.drivers[1] === driverId) {
      return 'yellow';
    }
  }

  cancel() {
    this.drivers = [];
  }

}
