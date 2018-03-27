import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { } from 'googlemaps';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.css']
})
export class DestinationModalComponent implements OnInit {

  fromMarker: any;
  toMarker: any;
  markertsCount = 0;

  constructor() { }

  @Input() action: string;
  @Input() destination: object;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  ngOnInit() {
  }

  ok() {
    this.modalAddUpdate.emit();
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

}
