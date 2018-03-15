import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { UserService } from './../_services/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  action: string;
  userId: string;

  deleteHeader = 'Delete User';
  deleteText = 'Are you sure you want to delete this user?';

  constructor(private userService: UserService) {
   }

  ngOnInit() {
  }

  setDeleteId() {
    console.log('setting id object');
    // ovde uzimam id iz tabele i postavljam ga kao userId
  }

  delete() {
    console.log('delete in users component');
  }

}
