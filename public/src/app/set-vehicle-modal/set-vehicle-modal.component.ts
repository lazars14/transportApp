import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { VehicleService, DestinationService } from './../_services/index';
import { NotificationComponent } from './../notification/notification.component';
import { Destination, Vehicle } from './../_model/index';

@Component({
  selector: 'app-set-vehicle-modal',
  templateUrl: './set-vehicle-modal.component.html',
  styleUrls: ['./set-vehicle-modal.component.css']
})
export class SetVehicleModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() destination: Destination;
  @Input() vehicle: Vehicle;
  @Output() setVehicle = new EventEmitter();

  vehicles = [];

  constructor(private vehicleService: VehicleService, private destinationService: DestinationService) { }

  ngOnInit() {}

  loadData() {
    this.vehicleService.findAllManager().subscribe(data => {
      data.forEach(element => {
        this.destinationService.checkIfVehicleAvailable(element._id, this.destination.startDate, this.destination.endDate)
        .subscribe(vehicleId => {
          console.log(vehicleId);
          this.vehicleService.findById(vehicleId).subscribe(vehicle => {
            this.vehicles.push(vehicle);
          }, error => {
            this.notification.error('Find Vehicle By Id - Error ' + error.status + ' - ' + error.statusText);
          });
        }, error => {
          this.notification.error('Check If Vehicle Available - Error ' + error.status + ' - ' + error.statusText);
        });
      }, error => {
        this.notification.error('Get All Vehicles - Error ' + error.status + ' - ' + error.statusText);
      });
    });
  }

  setCurrentVehicle(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  ok() {
    this.setVehicle.emit();
  }

  cancel() {
    this.vehicles = [];
  }

}
