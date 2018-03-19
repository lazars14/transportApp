import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from './../utils/constants';
import { Vehicle, VehicleExpense } from '../_model/index';
import { VehicleService, VehicleExpenseService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  client: boolean;

  vehicles: Array<Vehicle>;
  vehicle: Vehicle = new Vehicle();
  expense: VehicleExpense = new VehicleExpense();

  action: string;

  // for vehicle and expense delete
  id: string;
  vehicleId: string;
  error: any;

  deleteHeader: string;
  deleteText: string;

  deleteHeaderVehicle = 'Delete Vehicle';
  deleteTextVehicle = 'Are you sure you want to delete this vehicle?';

  deleteHeaderVehicleExpense = 'Delete Vehicle Expense';
  deleteTextVehicleExpense = 'Are you sure you want to delete this expense?';

  constructor(private vehicleService: VehicleService, private vehicleExpenseService: VehicleExpenseService,
    private router: Router, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.fillUserType();
    this.refreshPage();
  }

  refreshPage() {
    this.vehicleService.findAll().subscribe(data => {
      this.vehicles = data;
      this.vehicles.forEach(element => {
        this.vehicleExpenseService.findAllForVehicle(element._id).subscribe(expenses => {
          element.expenses = expenses;
        });
      });
    });
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
    // ovde uzimam id iz tabele i postavljam ga kao id

    // onda uzimam isto vehicleId i postavljam ga
  }

  add() {
    if (this.client) {
      console.log('add vehicle in component');
      this.vehicleService.create(this.vehicle).subscribe(
        result => {
          this.notification.success('Vehicle created successfuly');
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
    } else {
      console.log('add vehicleExpense in component');
      this.vehicleExpenseService.create(this.expense).subscribe(
        result => {
          this.notification.success('Vehicle expense created successfuly');
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

  update() {
    if (this.client) {
      console.log('update vehicle in component');
      this.vehicleService.update(this.vehicle).subscribe(
        result => {
          this.notification.success('Vehicle updated successfuly');
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
    } else {
      console.log('update vehicleExpense in component');
      this.vehicleExpenseService.update(this.expense).subscribe(
        result => {
          this.notification.success('Vehicle created successfuly');
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

  delete() {
    if (this.client) {
      console.log('delete vehicle in component');
      this.vehicleService.delete(this.id).subscribe(
        result => {
          this.notification.success('Vehicle deleted successfuly');
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
    } else {
      console.log('delete vehicleExpense in component');
      this.vehicleExpenseService.delete(this.id, this.vehicleId).subscribe(
        result => {
          this.notification.success('Vehicle deleted successfuly');
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

}
