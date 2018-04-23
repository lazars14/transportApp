import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { Manager } from '../_model/index';
import { ManagerService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { ManagerModalComponent } from './../manager-modal/manager-modal.component';
import { SessionService } from './../_core/index';
import * as _ from 'lodash';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(ManagerModalComponent) managerModal: ManagerModalComponent;

  managers: Array<Manager>;
  manager: Manager = new Manager();
  action: string;
  managerId: string;

  deleteHeader = 'Delete Manager';
  deleteText = 'Are you sure you want to delete this manager?';

  constructor(private managerService: ManagerService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.managerService.findAll().subscribe(data => {
      this.managers = data;
    }, error => {
      this.notification.error('Get Managers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  modalAddUpdate(manager) {
    if (this.action === constants.add) {
      this.add(manager);
    } else {
      this.update(manager);
    }
  }

  resetForm() {
    this.manager = new Manager();
  }

  setAction(manager: Manager) {
    if (manager === null) {
      this.action = constants.add;
    } else {
      this.manager = _.cloneDeep(manager);
      this.managerModal.loadManager(manager._id);
      this.action = constants.update;
    }
  }

  setDeleteId(id: string) {
    console.log('setting id object');
    this.managerId = id;
  }

  add(manager) {
    console.log('manager to add ', manager);
    console.log('add in managers component');
    this.managerService.create(manager).subscribe(
      result => {
        this.notification.success('Manager created successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.notification.error('Add Manager - Error ' + error.status + ' - ' + error.statusText);
      });
  }

  update(manager) {
    console.log('manager to update ', manager);
    console.log('update in drivers component');
    this.managerService.update(manager).subscribe(
      result => {
        this.notification.success('Manager updated successfuly');
        this.refreshPage();
        this.resetForm();
      },
      error => {
        this.notification.error('Update Manager - Error ' + error.status + ' - ' + error.statusText);
      });
  }

  delete() {
    console.log('delete in drivers component');
    this.managerService.delete(this.managerId).subscribe(
      result => {
        this.notification.success('Manager deleted successfuly');
        this.refreshPage();
      },
      error => {
        this.notification.error('Delete Manager - Error ' + error.status + ' - ' + error.statusText);
      });
  }

}
