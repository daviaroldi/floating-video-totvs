import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { MainComponent } from './../pages/main.component';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'app',  component: AppComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
