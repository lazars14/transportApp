import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { Vehicle, VehicleExpense } from '../_model/index';
import { VehicleService, VehicleExpenseService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  client: boolean;

  vehicle: Vehicle = new Vehicle();
  expense: VehicleExpense = new VehicleExpense();

  action: string;
  id: string;

  deleteHeader: string;
  deleteText: string;

  deleteHeaderVehicle = 'Delete Vehicle';
  deleteTextVehicle = 'Are you sure you want to delete this vehicle?';

  deleteHeaderVehicleExpense = 'Delete Vehicle Expense';
  deleteTextVehicleExpense = 'Are you sure you want to delete this expense?';

  constructor(private vehicleService: VehicleService, private vehicleExpenseService: VehicleExpenseService, private router: Router) {
  }

  ngOnInit() {
    this.fillUserType();
  }

  fillUserType() {
    const userType = this.router.url;
    // url is /client/login or /manager/login
    const num = userType.indexOf('client');
    // here check if url contains 'client', if it doesn't it will return -1
    if (num === -1) {
      this.client = false;
    } else {
      this.client = true;
    }
  }

  modalAddUpdate() {
    if (this.action === constants.add) {
      this.add();
    } else {
      this.update();
    }
  }

  resetForm() {
    if (this.client) {
      this.vehicle = new Vehicle();
      console.log('reseting vehicle');
    } else {
      this.expense = new VehicleExpense();
      console.log('reseting vehicle expense');
    }
  }

  setAction(add: boolean) {
    if (add) {
      this.action = constants.add;
    } else {
      this.action = constants.update;
    }
  }

  setDeleteId() {
    if (this.client) {
      this.deleteHeader = this.deleteHeaderVehicle;
      this.deleteText = this.deleteTextVehicle;
    } else {
      this.deleteHeader = this.deleteHeaderVehicleExpense;
      this.deleteText = this.deleteTextVehicleExpense;
    }
    console.log('setting id object');
    // ovde uzimam id iz tabele i postavljam ga kao managerId
  }

  add() {
    if (this.client) {
      console.log('add vehicle in component');
    } else {
      console.log('add vehicleExpense in component');
    }
    // this.notification.error('Failed to create new driver');
    // reset manager
    // this.manager = new Manager();
  }

  update() {
    if (this.client) {
      console.log('update vehicle in component');
    } else {
      console.log('update vehicleExpense in component');
    }
    // reset manager
    // this.manager = new Manager();
  }

  delete() {
    if (this.client) {
      console.log('delete vehicle in component');
    } else {
      console.log('delete vehicleExpense in component');
    }
    // reset delete id
    // managerId = null;
  }

}
