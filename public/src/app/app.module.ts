import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ClientService,
         DestinationRequestService,
         DestinationService,
         DriverService,
         ManagerService,
         UserService,
         VehicleExpenseService,
         VehicleService,
         AuthService } from './_services/index';
import { SessionService, HttpService, ClientGuard, ManagerGuard } from './_core/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateCmInfoComponent } from './update-cm-info/update-cm-info.component';
import { UsersComponent } from './users/users.component';

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
    VehicleDetailsComponent,
    DashboardComponent,
    UpdateCmInfoComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    NgProgressModule,
    ScrollToModule.forRoot()
  ],
  providers: [AuthService, ClientGuard, ManagerGuard,
    SessionService, ClientService, DestinationRequestService, DestinationService,
    DriverService, ManagerService, UserService, VehicleExpenseService, VehicleService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SessionService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
