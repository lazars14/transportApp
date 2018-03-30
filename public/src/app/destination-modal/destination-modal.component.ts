import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  AfterContentChecked
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NgForm
} from '@angular/forms';

import {} from 'googlemaps';
import {
  AgmMap,
  MapsAPILoader
} from '@agm/core';
import { DirectionComponent } from '../direction/direction.component';
import { Destination } from './../_model/index';

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.css']
})
export class DestinationModalComponent implements OnInit {

  markers = [];
  startMarker = {};
  endMarker = {};
  markersCount = 0;

  @ViewChild(AgmMap) agmMap: AgmMap;
  @ViewChild(DirectionComponent) direction;

  constructor() {}

  @Input() action: string;
  @Input() destination: Destination;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  ngOnInit() {}

  ok() {
    this.destination.startLocation = this.startMarker;
    this.destination.endLocation = this.endMarker;
    this.modalAddUpdate.emit();
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

  mapClicked($event) {
    console.log('clicked');
    console.log('markers count ', this.markersCount);
    if (this.markersCount === 0) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'A',
        title: 'title'
      });
      this.startMarker = $event.coords;
      this.markersCount++;
      console.log('first click');
    } else if (this.markersCount === 1) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'B',
        title: 'title'
      });
      this.endMarker = $event.coords;
      this.markersCount++;
      console.log('second click');
      this.direction.drawDirection(this.startMarker, this.endMarker);
      // reset markers to display only A to B
      this.markers = [];
    }
  }

  resetMap() {
    console.log('reseting map');
    this.direction.removeDirection();
    // this.direction.removeDirection();
  }

}
