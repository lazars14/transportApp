import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DestinationRequest } from '../_model/index';
import { AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  @Input() destinationRequest: DestinationRequest;
  @Output() resetLocation = new EventEmitter();

  @ViewChild(AgmMap) agmMap: AgmMap;

  lat = 0;
  lng = 0;

  startLocation: any;
  endLocation: any;

  showMap = false;

  ngOnInit() {
    $('#locationModal').on('shown.bs.modal', (e) => {
      this.startLocation = this.destinationRequest.startLocation;
      this.endLocation = this.destinationRequest.endLocation;
      this.lat = (this.startLocation.lat + this.endLocation.lat) / 2;
      this.lng = (this.startLocation.lng + this.endLocation.lng) / 2;
      this.showMap = true;
      this.agmMap.triggerResize();
    });
  }

  cancel(form: NgForm) {
    this.resetLocation.emit();
  }

}
