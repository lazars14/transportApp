import { Component, OnInit } from '@angular/core';
import { constants } from './../utils/constants';
import { Driver } from '../_model/index';
import { DriverService } from './../_services/index';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  driver: Driver;
  action: string;
  driverId: string;

  deleteHeader = 'Delete Driver';
  deleteText = 'Are you sure you want to delete this driver?';

  constructor() { }

  ngOnInit() {
  }

  modalAddUpdate() {
    if (this.action === constants.add) {
      this.add();
    } else {
      this.update();
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
    console.log('setting id object');
    // ovde uzimam id iz tabele i postavljam ga kao driverId
  }

  add() {
    console.log('add in drivers component');
  }

  update() {
    console.log('update in drivers component');
  }

  delete() {
    console.log('delete in drivers component');
  }



}
