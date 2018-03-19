import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { Driver } from '../_model/index';
import { DriverService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  drivers: Array<Driver>;
  driver: Driver = new Driver();
  action: string;
  driverId: string;
  error: any;

  deleteHeader = 'Delete Driver';
  deleteText = 'Are you sure you want to delete this driver?';

  constructor(private driverService: DriverService, private sessionService: SessionService) {}

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.driverService.findAll().subscribe(data => {
      this.drivers = data;
    });
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

  setAction(driver: Driver) {
    if (driver === null) {
      this.action = constants.add;
    } else {
      this.driver = driver;
      this.action = constants.update;
    }
  }

  setDeleteId(id: string) {
    console.log('setting id object');
    this.driverId = id;
  }

  add() {
    console.log('add in drivers component');
    this.driverService.create(this.driver).subscribe(
      result => {
        this.notification.success('Driver created successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.error = JSON.parse(error._body);
        if (this.error.status === 401 || this.error === 403) {
          this.sessionService.logout(true);
        }
        this.notification.error('Error ' + error.status);
      });
  }

  update() {
    console.log('update in drivers component');
    this.driverService.update(this.driver).subscribe(
      result => {
        this.notification.success('Driver updated successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.error = JSON.parse(error._body);
        if (this.error.status === 401 || this.error === 403) {
          this.sessionService.logout(true);
        }
        this.notification.error('Error ' + error.status);
      });
  }

  delete() {
    console.log('delete in drivers component');
    this.driverService.delete(this.driverId).subscribe(
      result => {
        this.notification.success('Driver deleted successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.error = JSON.parse(error._body);
        if (this.error.status === 401 || this.error === 403) {
          this.sessionService.logout(true);
        }
        this.notification.error('Error ' + error.status);
      });
  }

}
