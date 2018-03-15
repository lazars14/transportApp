import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { Manager } from '../_model/index';
import { ManagerService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  manager: Manager = new Manager();
  action: string;
  managerId: string;

  deleteHeader = 'Delete Manager';
  deleteText = 'Are you sure you want to delete this manager?';

  constructor(private managerService: ManagerService) {
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
    this.manager = new Manager();
    console.log(this.manager);
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
    // ovde uzimam id iz tabele i postavljam ga kao managerId
  }

  add() {
    console.log('add in drivers component');
    // this.notification.error('Failed to create new driver');
    // reset manager
    // this.manager = new Manager();
  }

  update() {
    console.log('update in drivers component');
    // reset manager
    // this.manager = new Manager();
  }

  delete() {
    console.log('delete in drivers component');
    // reset delete id
    // managerId = null;
  }

}
