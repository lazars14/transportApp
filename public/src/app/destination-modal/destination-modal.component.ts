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

  today = new Date();

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

  ngAfterViewInit() {
    console.log('ovo je mapa ', this.agmMap);
    // $('#myModal').on('show.bs.modal', function() {
      // this.showMap = true;
      // this.agmMap.triggerResize();
      // console.log('shown');
      // this.element.click();
    // });
  }

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
    console.log(this.visible);
    this.destination.startLocation = this.startMarker;
    this.destination.endLocation = this.endMarker;
    const month = this.destination.startDate.getMonth() + 1,
  day = this.destination.startDate.getDate(),
  year = this.destination.startDate.getFullYear();
  this.destination.startDate = new Date(month + '-' + day + '-' + year + ' ' + time);
    // console.log('novi datum: ', this.destination.startDate);
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
      this.visible = true;
      // this.direction.drawDirection(this.startMarker, this.endMarker);
      // reset markers to display only A to B
      this.markers = [];
    }
  }

  resetMap(date) {
    console.log('reseting map');
    this.visible = false;
    this.markersCount = 0;

    // testing
    console.log('datum posle dodavanja ', this.destination.startDate);
    console.log(date);

    // this.startMarker = {};
    // this.endMarker = {};
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

  // showMap() {
  //   this.agmMap.triggerResize();
  // }

}
