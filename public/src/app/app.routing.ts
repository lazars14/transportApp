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
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdateManagerComponent } from './update-manager/update-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
                        path: '',
                        component: LoginComponent,
                        canActivateChild: [ClientGuard],

                    },
                    {
                        path: 'managers',
                        component: ManagersComponent
                    },
                    // {
                    //     path: 'managers/:id',
                    //     component: LoginComponent,
                    // },
                    {
                        path: 'vehicles',
                        component: VehiclesComponent,
                    },
                    {
                        path: 'vehicles/:id',
                        component: LoginComponent
                    },
                    {
                        path: 'drivers',
                        component: DriversComponent,
                    },
                    // {
                    //     path: 'drivers/:id',
                    //     component: LoginComponent,
                    // },
                    {
                        path: 'updateInfo',
                        component: UpdateClientComponent,
                    }
                ]

            }
        ]
    },
    {
        path: 'manager/dashboard', component: LoginComponent, canActivate: [ManagerGuard],
        children: [
            {
                path: '',
                canActivateChild: [ManagerGuard],
                children: [
                    {
                        path: '',
                        component: LoginComponent,
                        canActivateChild: [ManagerGuard],
                    },
                    {
                        path: 'vehicles',
                        component: VehiclesComponent
                    },
                    // {
                    //     path: 'vehicleExpenses/:id',
                    //     component: LoginComponent,
                    // },
                    {
                        path: 'destinations',
                        component: LoginComponent,
                    },
                    {
                        path: 'destinations/:id',
                        component: LoginComponent
                    },
                    {
                        path: 'destinationRequests',
                        component: LoginComponent,
                    },
                    // {
                    //     path: 'destinationRequests/:id',
                    //     component: LoginComponent,
                    // },
                    {
                        path: 'updateInfo',
                        component: UpdateManagerComponent,
                    }
                ]

            }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
