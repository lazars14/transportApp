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

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.css']
})
export class DestinationModalComponent implements OnInit {

  fromMarker: any;
  toMarker: any;
  markertsCount = 0;

  isVisible = false;

  @ViewChild(AgmMap) agmMap: AgmMap;

  constructor() {}

  @Input() action: string;
  @Input() destination: object;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  ngOnInit() {
    this.agmMap.triggerResize(true);
    this.agmMap.latitude = 12;
    this.agmMap.longitude = 12;
    console.log(this.agmMap.latitude, 'is latitude');
    console.log(this.agmMap.longitude, 'is longitude');
  }

  ok() {
    this.modalAddUpdate.emit();
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

}
