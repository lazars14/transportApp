import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent implements OnInit {

  @Input() action: string;
  @Input() expense: object;
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