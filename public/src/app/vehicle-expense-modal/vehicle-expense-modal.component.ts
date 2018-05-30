import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { constants } from './../utils/constants';
import { VehicleExpense } from '../_model/index';

@Component({
  selector: 'app-vehicle-expense-modal',
  templateUrl: './vehicle-expense-modal.component.html',
  styleUrls: ['./vehicle-expense-modal.component.css']
})
export class VehicleExpenseModalComponent implements OnInit {

  @Input() action: string;
  @Input() expense: VehicleExpense;
  @Output() modalAddUpdate = new EventEmitter();
  @Output() resetForm = new EventEmitter();

  constructor() { }

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
