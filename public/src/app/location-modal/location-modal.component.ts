import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DestinationRequest } from '../_model/index';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {

  constructor() { }

  @Input() destinationRequest: DestinationRequest;
  @Output() resetLocation = new EventEmitter();

  ngOnInit() {
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetLocation.emit();
  }

}
