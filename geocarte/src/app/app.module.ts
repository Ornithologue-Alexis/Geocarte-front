import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';


import { AgmCoreModule } from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAZKYezUJLxkFdkaH1pxNqJeAX8OV5Ej0	'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
