import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DriverService, DestinationService } from './../_services/index';
import { NotificationComponent } from './../notification/notification.component';
import { Destination, Driver } from './../_model/index';

@Component({
  selector: 'app-set-drivers-modal',
  templateUrl: './set-drivers-modal.component.html',
  styleUrls: ['./set-drivers-modal.component.css']
})
export class SetDriversModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() destination: Destination;
  @Output() setDrivers = new EventEmitter<Array<Driver>>();

  drivers = [];

  constructor(private driverService: DriverService) { }

  ngOnInit() {}

  loadData() {
    this.driverService.findAllManager().subscribe(data => {
      this.drivers = data;
      console.log(data);

      console.log('ovo su vozaci', this.destination.drivers);
      this.drivers.forEach(element => {
        console.log(element);
      });
    }, error => {
      this.notification.error('Get All Drivers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  isSelected(driverId: string) {
    if (this.destination.drivers[0] === driverId || this.destination.drivers[1] === driverId) {
      return true;
    }

    return false;
  }

  set(driver: Driver) {
    // to do
    console.log('setting driver', driver);
  }

  remove(driver: Driver) {
    // to do
    console.log('removing driver', driver);
  }

  ok() {
    this.setDrivers.emit(this.drivers);
  }

  cancel() {
    this.drivers = [];
  }

}
