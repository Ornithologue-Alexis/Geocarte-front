import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';

import { AgmCoreModule } from '@agm/core';
import {MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAZKYezUJLxkFdkaH1pxNqJeAX8OV5Ej0	'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
