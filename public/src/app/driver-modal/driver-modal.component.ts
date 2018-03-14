import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.css']
})
export class DriverModalComponent implements OnInit {

  @Input() action: string;
  @Input() driver: string;
  @Output() modalAddUpdate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ok() {
    this.modalAddUpdate.emit();
  }

}
