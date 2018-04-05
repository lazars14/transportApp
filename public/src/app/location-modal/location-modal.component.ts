import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DestinationRequest } from '../_model/index';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {

  constructor() { }

  @Input() destinationRequest: DestinationRequest;
  @Output() resetLocation = new EventEmitter();

  @ViewChild(AgmMap) agmMap: AgmMap;

  showMap = false;

  ngOnInit() {
  }

  cancel(form: NgForm) {
    this.showMap = false;
    this.resetLocation.emit();
  }

}
