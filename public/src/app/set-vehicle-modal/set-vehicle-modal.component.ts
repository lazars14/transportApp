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
  @Output() setVehicle = new EventEmitter<Vehicle>();

  vehicles = [];

  constructor(private vehicleService: VehicleService, private destinationService: DestinationService) { }

  ngOnInit() {
    this.vehicle = new Vehicle();
    this.vehicle._id = '';
  }

  loadData() {
    if (this.destination.vehicleId) {
      this.vehicle._id = this.destination.vehicleId;
    }
    this.vehicleService.findAllManager().subscribe(data => {
      data.forEach(element => {
        // just for testing
        this.destination.endDate = new Date();
        this.destinationService.checkIfVehicleAvailable(element._id, this.destination.startDate, this.destination.endDate)
        .subscribe(vehicleId => {
          this.vehicleService.findByIdManager(vehicleId).subscribe(foundVehicle => {
            this.vehicles.push(foundVehicle);
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
    this.setVehicle.emit(this.vehicle);
  }

  cancel() {
    this.vehicles = [];
  }

}
