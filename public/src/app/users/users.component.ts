import { Component, OnInit, ViewChild } from '@angular/core';
import { constants } from './../utils/constants';
import { UserService } from './../_services/index';
import { User } from './../_model/index';
import { SessionService } from './../_core/index';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  users: Array<User>;

  userId: string;

  deleteHeader = 'Delete User';
  deleteText = 'Are you sure you want to delete this user?';

  constructor(private userService: UserService, private sessionService: SessionService) {
   }

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    }, error => {
      this.notification.error('Get Users - Error ' + error.status + ' - ' + error.statusText);
    });
  }

  setDeleteId(id: string) {
    this.userId = id;
  }

  delete() {
    this.userService.delete(this.userId).subscribe(
      result => {
        this.notification.success('User deleted successfuly');
        this.refreshPage();
      },
      error => {
        this.notification.error('Delete User - Error ' + error.status + ' - ' + error.statusText);
      });
  }

}
