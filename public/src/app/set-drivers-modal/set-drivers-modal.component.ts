import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverService, DestinationService } from './../_services/index';
import { NotificationComponent } from './../notification/notification.component';

@Component({
  selector: 'app-set-drivers-modal',
  templateUrl: './set-drivers-modal.component.html',
  styleUrls: ['./set-drivers-modal.component.css']
})
export class SetDriversModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  drivers = [];

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.driverService.findAllManager().subscribe(data => {
      this.drivers = data;
      console.log(data);
      this.drivers.forEach(element => {
        console.log(element);
      });
    }, error => {
      this.notification.error('Get All Drivers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

}
