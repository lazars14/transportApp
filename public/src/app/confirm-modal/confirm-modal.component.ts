import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() header: string;
  @Input() text: string;
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  ok() {
    this.delete.emit();
  }

}
