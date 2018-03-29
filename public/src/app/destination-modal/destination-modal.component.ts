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
import { DirectionDirective } from '../_directives/index';

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.css']
})
export class DestinationModalComponent implements OnInit {

  dummyMarker = {
    lat: 0, lng: 0
  };

  markers = [];

  startMarker = {};
  endMarker = {};
  markertsCount = 0;

  isVisible = false;

  @ViewChild(AgmMap) agmMap: AgmMap;
  @ViewChild(DirectionDirective) direction: DirectionDirective;

  constructor() {}

  @Input() action: string;
  @Input() destination: object;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  ngOnInit() {}

  ok() {
    this.modalAddUpdate.emit();
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

  mapClicked($event) {
    console.log('clicked');
    if (this.markertsCount === 0) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'A',
        title: 'title'
      });
      this.startMarker = $event.coords;
      this.markertsCount++;
    } else if (this.markertsCount === 1) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'B',
        title: 'title'
      });
      this.endMarker = $event.coords;
      this.markertsCount++;
      // this.direction.drawDirection();
      // reset markers to display only A to B
      this.markers = [];
    }
  }

  resetMap() {
    console.log('reseting map');
    this.startMarker = {};
    this.endMarker = {};
    // this.direction.removeDirection();
  }

  // markerDragEnd(m, $event) {
  //   console.log('markers before change: ', this.markers);
  //   const index = this.markers.indexOf(m);
  //   // this.markers[index].lat = $event.coords.lat;
  //   // this.markers[index].lng = $event.coords.lng;
  //   this.markers[index].label = 'c';
  //   console.log('markers after change: ', this.markers);
  // }

}
