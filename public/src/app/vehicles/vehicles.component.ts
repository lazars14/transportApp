import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  constants
} from './../utils/constants';
import {
  Vehicle,
  VehicleExpense
} from '../_model/index';
import {
  VehicleService,
  VehicleExpenseService
} from './../_services/index';
import {
  NotificationComponent
} from '../notification/notification.component';
import {
  SessionService
} from './../_core/index';
import * as _ from 'lodash';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  client: boolean;

  vehicles: Array < Vehicle > ;
  vehicle: Vehicle = new Vehicle();
  expense: VehicleExpense = new VehicleExpense();

  action: string;

  // for vehicle and expense delete
  id: string;
  vehicleId: string;

  deleteHeader: string;
  deleteText: string;

  deleteHeaderVehicle = 'Delete Vehicle';
  deleteTextVehicle = 'Are you sure you want to delete this vehicle?';

  deleteHeaderVehicleExpense = 'Delete Vehicle Expense';
  deleteTextVehicleExpense = 'Are you sure you want to delete this expense?';

  constructor(private vehicleService: VehicleService, private vehicleExpenseService: VehicleExpenseService,
    private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.fillUserType();
    this.refreshPage();
  }

  refreshPage() {
    if (this.client) {
      this.vehicleService.findAll().subscribe(data => {
        this.vehicles = data;
        this.vehicles.forEach(element => {
          this.vehicleExpenseService.findAllForVehicle(element._id).subscribe(expenses => {
            element.expenses = expenses;
          }, error => {
            this.notification.error('Get Expenses For Vehicle - Error ' + error.status + ' - ' + error.statusText);
          });
        });
      }, error => {
        this.notification.error('Get Vehicles - Error ' + error.status + ' - ' + error.statusText);
      });
    } else {
      this.vehicleService.findAllManager().subscribe(data => {
        this.vehicles = data;
        this.vehicles.forEach(element => {
          this.vehicleExpenseService.findAllForVehicleManager(element._id).subscribe(expenses => {
            element.expenses = expenses;
          }, error => {
            this.notification.error('Get Expenses For Vehicle - Error ' + error.status + ' - ' + error.statusText);
          });
        });
      }, error => {
        this.notification.error('Get Vehicles - Error ' + error.status + ' - ' + error.statusText);
      });
    }
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
    } else {
      this.expense = new VehicleExpense();
    }
  }

  setAction(vehicle: boolean, obj: object, vehicleId: string) {
    if (obj === null) {
      if (!vehicle) {
        this.expense.vehicleId = vehicleId;
      }
      this.action = constants.add;
    } else {
      this.setUpdateObject(obj, vehicle);
      this.action = constants.update;
    }
  }

  setRegistration(vehicle: Vehicle) {
    this.vehicle = _.cloneDeep(vehicle);
    this.vehicle.licenseExpireDate = new Date(this.vehicle.licenseExpireDate);
  }

  // method for converting obj to vehicle or vehicleExpense object
  setUpdateObject(vehicleOrExpense: object, vehicle: boolean) {
    let object2;

    if (vehicle) {
      object2 = new Vehicle();
    } else {
      object2 = new VehicleExpense();
    }

    for (const prop in vehicleOrExpense) {
      if (vehicle) {
        object2[prop] = vehicleOrExpense[prop];
      } else {
        object2[prop] = vehicleOrExpense[prop];
      }
    }

    if (vehicle) {
      this.vehicle = _.cloneDeep(object2);
    } else {
      this.expense = _.cloneDeep(object2);
      this.expense.date = new Date(this.expense.date);
    }
  }

  setDeleteId(id: string, vehicleId: string) {
    if (this.client) {
      this.deleteHeader = this.deleteHeaderVehicle;
      this.deleteText = this.deleteTextVehicle;
    } else {
      this.vehicleId = vehicleId;
      this.deleteHeader = this.deleteHeaderVehicleExpense;
      this.deleteText = this.deleteTextVehicleExpense;
    }

    this.id = id;
  }

  add() {
    if (this.client) {
      this.vehicleService.create(this.vehicle).subscribe(
        result => {
          this.notification.success('Vehicle created successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Add Vehicle - Error ' + error.status + ' - ' + error.statusText);
        });
    } else {
      this.vehicleExpenseService.create(this.expense).subscribe(
        result => {
          this.notification.success('Vehicle expense created successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Add Expense - Error ' + error.status + ' - ' + error.statusText);
        });
    }

  }

  update() {
    if (this.client) {
      this.vehicleService.update(this.vehicle).subscribe(
        result => {
          this.notification.success('Vehicle updated successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Update Vehicle - Error ' + error.status + ' - ' + error.statusText);
        });
    } else {
      this.vehicleExpenseService.update(this.expense).subscribe(
        result => {
          this.notification.success('Vehicle created successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Update Expense - Error ' + error.status + ' - ' + error.statusText);
        });
    }

  }

  delete() {
    if (this.client) {
      this.vehicleService.delete(this.id).subscribe(
        result => {
          this.notification.success('Vehicle deleted successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Delete Vehicle - Error ' + error.status + ' - ' + error.statusText);
        });
    } else {
      this.vehicleExpenseService.delete(this.id, this.vehicleId).subscribe(
        result => {
          this.notification.success('Vehicle deleted successfuly');
          this.refreshPage();
          this.resetForm();
        },
        error => {
          this.notification.error('Delete Expense - Error ' + error.status + ' - ' + error.statusText);
        });
    }

  }

  extendRegistration() {
    this.vehicleService.extendRegistration(this.vehicle).subscribe(
      result => {
        this.notification.success('Registration extended successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.notification.error('Extend Registration - Error ' + error.status + ' - ' + error.statusText);
      }
    );
  }

}
