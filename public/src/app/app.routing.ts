import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientGuard } from './_core/client.guard';
import { ManagerGuard } from './_core/manager.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'client/login', component: LoginComponent },
    { path: 'manager/login', component: LoginComponent },
    {
        path: 'client/dashboard', component: LoginComponent, canActivate: [ClientGuard],
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
                        component: LoginComponent
                    },
                    {
                        path: 'managers/:id',
                        component: LoginComponent,
                    },
                    {
                        path: 'vehicles',
                        component: LoginComponent,
                    },
                    {
                        path: 'vehicles/:id',
                        component: LoginComponent
                    },
                    {
                        path: 'drivers',
                        component: LoginComponent,
                    },
                    {
                        path: 'drivers/:id',
                        component: LoginComponent,
                    },
                    {
                        path: 'updateInfo',
                        component: LoginComponent,
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
                        path: 'vehicleExpenses',
                        component: LoginComponent
                    },
                    {
                        path: 'vehicleExpenses/:id',
                        component: LoginComponent,
                    },
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
                    {
                        path: 'destinationRequests/:id',
                        component: LoginComponent,
                    },
                    {
                        path: 'updateInfo',
                        component: LoginComponent,
                    }
                ]

            }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
