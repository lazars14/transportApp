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

  action: string;
  userId: string;
  error: any;

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
    });
  }

  setDeleteId(id: string) {
    console.log('setting id object');
    this.userId = id;
  }

  delete() {
    console.log('delete in users component');
    this.userService.delete(this.userId).subscribe(
      result => {
        this.notification.success('User deleted successfuly');
        this.refreshPage();
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
