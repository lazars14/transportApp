import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ManagerService } from './../_services/manager.service';
import { Manager } from './../_model/index';
import { NotificationComponent } from './../notification/notification.component';

@Component({
  selector: 'app-manager-modal',
  templateUrl: './manager-modal.component.html',
  styleUrls: ['./manager-modal.component.css']
})
export class ManagerModalComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input() action: string;
  @Input() manager: Manager;
  @Output() modalAddUpdate = new EventEmitter<Manager>();
  @Output() resetForm = new EventEmitter();

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
  }

  ok() {
    this.modalAddUpdate.emit(this.manager);
  }

  cancel(form: NgForm) {
    form.reset();
    this.resetForm.emit();
  }

  loadManager(id: string) {
    this.managerService.findById(id).subscribe(manager => {
      this.manager = manager;
    }, error => {
      this.notification.error('Get Managers - Error ' + error.status + ' - ' + error.statusText);
    });
  }

}
