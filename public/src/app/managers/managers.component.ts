import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { Manager } from '../_model/index';
import { ManagerService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  managers: Array<Manager>;
  manager: Manager = new Manager();
  action: string;
  managerId: string;
  error: any;

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
    this.manager = new Manager();
    console.log(this.manager);
  }

  setAction(manager: Manager) {
    if (manager === null) {
      this.action = constants.add;
    } else {
      this.manager = manager;
      this.action = constants.update;
    }
  }

  setDeleteId(id: string) {
    console.log('setting id object');
    this.managerId = id;
  }

  add() {
    console.log('add in drivers component');
    this.managerService.create(this.manager).subscribe(
      result => {
        this.notification.success('Manager created successfuly');
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
    this.managerService.update(this.manager).subscribe(
      result => {
        this.notification.success('Manager updated successfuly');
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
    this.managerService.delete(this.managerId).subscribe(
      result => {
        this.notification.success('Manager deleted successfuly');
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
