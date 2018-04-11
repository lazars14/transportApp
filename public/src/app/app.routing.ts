import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientGuard } from './_core/index';
import { ManagerGuard } from './_core/index';
import { ManagersComponent } from './managers/managers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateCmInfoComponent } from './update-cm-info/update-cm-info.component';
import { UsersComponent } from './users/users.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationComponent } from './destination/destination.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'client', component: LoginComponent },
    { path: 'manager', component: LoginComponent },
    {
        path: 'client/dashboard', component: DashboardComponent, canActivate: [ClientGuard],
        children: [
            {
                path: '',
                canActivateChild: [ClientGuard],
                children: [
                    {
                        path: 'managers',
                        component: ManagersComponent
                    },
                    {
                        path: 'vehicles',
                        component: VehiclesComponent,
                    },
                    {
                        path: 'drivers',
                        component: DriversComponent,
                    },
                    {
                        path: 'updateInfo',
                        component: UpdateCmInfoComponent,
                    }
                ]

            }
        ]
    },
    {
        path: 'manager/dashboard', component: DashboardComponent, canActivate: [ManagerGuard],
        children: [
            {
                path: '',
                canActivateChild: [ManagerGuard],
                children: [
                    {
                        path: 'vehicleExpenses',
                        component: VehiclesComponent
                    },
                    {
                        path: 'destinations',
                        component: DestinationsComponent,
                    },
                    {
                        path: 'destinations/:id',
                        component: DestinationComponent
                    },
                    {
                        path: 'destinationRequests',
                        component: LoginComponent,
                    },
                    {
                        path: 'updateInfo',
                        component: UpdateCmInfoComponent,
                    },
                    {
                        path: 'users',
                        component: UsersComponent,
                    }
                ]

            }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
