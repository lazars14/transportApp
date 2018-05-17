import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  AfterContentChecked,
  AfterViewInit
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
import {
  Destination
} from './../_model/index';
declare var $: any;

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.css']
})
export class DestinationModalComponent implements OnInit, AfterViewInit {

  markers = [];
  startMarker = {};
  endMarker = {};
  markersCount = 0;

  visible = false;
  zoom = 10;
  showMap = false;

  element: HTMLElement = document.getElementById('showMapButton') as HTMLElement;

  @ViewChild(AgmMap) agmMap: AgmMap;

  constructor() {}

  @Input() action: string;
  @Input() destination: Destination;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  ngOnInit() {
    this.destination.startDate = new Date();
  }

  ngAfterViewInit() {}

  get time() {
    if (this.destination.startDate) {

      const hour = this.destination.startDate.getHours();
      const minutes = this.destination.startDate.getMinutes();

      let hourStr, minStr;

      if (hour < 10) {
        hourStr = '0' + hour;
      } else {
        hourStr = hour.toString();
      }

      if (minutes < 10) {
        minStr = '0' + minutes;
      } else {
        hourStr = hour.toString();
      }

      return hourStr + ':' + minStr;
    }
  }

  ok(time) {
    this.startMarker['lat'] = Number(parseFloat(this.startMarker['lat']).toFixed(4));
    this.startMarker['lng'] = Number(parseFloat(this.startMarker['lng']).toFixed(4));
    this.endMarker['lat'] = Number(parseFloat(this.startMarker['lat']).toFixed(4));
    this.endMarker['lng'] = Number(parseFloat(this.startMarker['lng']).toFixed(4));

    this.destination.startLocation = this.startMarker;
    this.destination.endLocation = this.endMarker;

    const month = this.destination.startDate.getMonth() + 1,
    day = this.destination.startDate.getDate(),
    year = this.destination.startDate.getFullYear();
    this.destination.startDate = new Date(month + '-' + day + '-' + year + ' ' + time);
    this.modalAddUpdate.emit();
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

  mapClicked($event) {
    console.log('markers count is ', this.markersCount);
    if (this.markersCount === 0) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'A',
        title: 'title'
      });
      this.startMarker = $event.coords;
      this.markersCount++;
    } else if (this.markersCount === 1) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'B',
        title: 'title'
      });
      this.endMarker = $event.coords;
      this.markersCount++;
      this.visible = true;
      this.markers = [];
    }
  }

  resetMap() {
    this.visible = false;
    this.markersCount = 0;
    this.markers = [];
    this.startMarker = {};
    this.endMarker = {};
    this.agmMap.triggerResize();
  }

  setMapForEdit(destination: Destination) {
    this.destination = destination;
    this.startMarker = destination.startLocation;
    this.endMarker = destination.endLocation;
    this.visible = true;
  }

  disabled(startTime) {
    if (startTime != null || !this.visible || this.destination.startDate.getTime() < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }

}
