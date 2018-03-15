import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { Driver } from '../_model/index';
import { DriverService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  driver: Driver = new Driver();
  action: string;
  driverId: string;

  deleteHeader = 'Delete Driver';
  deleteText = 'Are you sure you want to delete this driver?';

  constructor(private driverService: DriverService) {
   }

  ngOnInit() {
  }

  modalAddUpdate() {
    if (this.action === constants.add) {
      this.add();
    } else {
      this.update();
    }
  }

  resetForm() {
    this.driver = new Driver();
  }

  setAction(add: boolean) {
    if (add) {
      this.action = constants.add;
    } else {
      this.action = constants.update;
    }
  }

  setDeleteId() {
    console.log('setting id object');
    // ovde uzimam id iz tabele i postavljam ga kao driverId
  }

  add() {
    console.log('add in drivers component');
    // this.notification.error('Failed to create new driver');
  }

  update() {
    console.log('update in drivers component');
  }

  delete() {
    console.log('delete in drivers component');
  }

}
