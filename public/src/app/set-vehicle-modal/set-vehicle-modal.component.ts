import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VehicleService, DestinationService } from './../_services/index';
import { NotificationComponent } from './../notification/notification.component';
import { Destination } from './../_model/index';

@Component({
  selector: 'app-set-vehicle-modal',
  templateUrl: './set-vehicle-modal.component.html',
  styleUrls: ['./set-vehicle-modal.component.css']
})
export class SetVehicleModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() destination: Destination;

  vehicles = [];

  constructor(private vehicleService: VehicleService, private destinationService: DestinationService) { }

  ngOnInit() {
    this.loadData();
  }

  /**
   * namestiti load data da se poziva iz parent komponente, na klik dugmeta - ne na ngOnInit (posto ne treba uvek da se ocita,
   * to se podesi samo jednom)
   */

  loadData() {
    this.vehicleService.findAllManager().subscribe(data => {
      this.vehicles = data;
      this.vehicles.forEach(element => {
        this.destinationService.checkIfVehicleAvailable(element._id, this.destination.startDate, this.destination.endDate)
        .subscribe(vehicle => {
          // to do
        }, error => {
          this.notification.error('Check If Vehicle Available - Error ' + error.status + ' - ' + error.statusText);
        });
      }, error => {
        this.notification.error('Get All Vehicles - Error ' + error.status + ' - ' + error.statusText);
      });
    });
  }

  ok() {
    // to do
  }




}
