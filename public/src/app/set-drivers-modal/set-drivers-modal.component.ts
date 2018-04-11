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
  @Input() drivers: Array<Driver>;
  @Output() setDrivers = new EventEmitter<Array<Driver>>();

  driversToPick = [];
  currentDrivers = [];

  constructor(private driverService: DriverService, private destinationService: DestinationService) { }

  ngOnInit() {}

  loadData() {
    if (this.drivers.length > 0) {
      this.currentDrivers = this.drivers.map(x => Object.assign({}, x));
      this.driversToPick = this.drivers.map(x => Object.assign({}, x));
    }
    this.driverService.findAllManager().subscribe(data => {
      data.forEach(element => {
        this.destinationService.checkIfDriverAvailable(element._id, this.destination.startDate, this.destination.endDate)
        .subscribe(dest => {
          if (dest.length === 0) {
            this.driversToPick.push(element);
          }
        }, error => {
          this.notification.error('Check If Driver Available - Error ' + error.status + ' - ' + error.statusText);
        });
      });
    }, error => {
      this.notification.error('Get All Drivers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  isSelected(driverId: string) {
    const found = this.currentDrivers.find(i => i._id === driverId);

    if (found) {
      return true;
    }

    return false;
  }

  set(driver: Driver) {
    this.currentDrivers.push(driver);
  }

  remove(driver: Driver) {
    const index = this.currentDrivers.indexOf(driver);
    this.currentDrivers.splice(index, 1);
  }

  ok() {
    this.setDrivers.emit(this.currentDrivers);
  }

  cancel() {
    this.driversToPick = [];
    this.currentDrivers = [];
  }

}
