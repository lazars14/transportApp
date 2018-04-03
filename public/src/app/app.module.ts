import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { HttpModule, RequestOptions, XHRBackend, BrowserXhr } from '@angular/http';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { routing } from './app.routing';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagersComponent } from './managers/managers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { ClientService,
         DestinationRequestService,
         DestinationService,
         DriverService,
         ManagerService,
         UserService,
         VehicleExpenseService,
         VehicleService,
         AuthService} from './_services/index';
import { SessionService, HttpService, ClientGuard, ManagerGuard } from './_core/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateCmInfoComponent } from './update-cm-info/update-cm-info.component';
import { UsersComponent } from './users/users.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DriverModalComponent } from './driver-modal/driver-modal.component';
import { ManagerModalComponent } from './manager-modal/manager-modal.component';
import { VehicleModalComponent } from './vehicle-modal/vehicle-modal.component';
import { DestinationModalComponent } from './destination-modal/destination-modal.component';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { NotificationComponent } from './notification/notification.component';
import { VehicleExpenseModalComponent } from './vehicle-expense-modal/vehicle-expense-modal.component';
import { ExtendRegistrationModalComponent } from './extend-registration-modal/extend-registration-modal.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { DestinationComponent } from './destination/destination.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { DirectionDirective } from './_directives/direction.directive';
import { DirectionComponent } from './direction/direction.component';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, sessionService: SessionService) {
  return new HttpService(backend, options, sessionService);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManagersComponent,
    VehiclesComponent,
    DriversComponent,
    DashboardComponent,
    UpdateCmInfoComponent,
    UsersComponent,
    DestinationsComponent,
    DriverModalComponent,
    ManagerModalComponent,
    VehicleModalComponent,
    DestinationModalComponent,
    ExpenseModalComponent,
    ConfirmModalComponent,
    NotificationComponent,
    VehicleExpenseModalComponent,
    ExtendRegistrationModalComponent,
    DestinationComponent,
    LocationModalComponent,
    DirectionDirective,
    DirectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpModule,
    NgProgressModule,
    ScrollToModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwYwTnD6SsaPzmEwP1-CZ0Sv9MWexhDDQ',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [AuthService, ClientGuard, ManagerGuard,
    SessionService, ClientService, DestinationRequestService, DestinationService,
    DriverService, ManagerService, UserService, VehicleExpenseService, VehicleService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SessionService]
    }, GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
