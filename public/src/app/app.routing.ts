import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent }
    { path: 'client/login', component: LoginComponent },
    { path: 'manager/login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
