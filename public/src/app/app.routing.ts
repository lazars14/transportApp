import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
