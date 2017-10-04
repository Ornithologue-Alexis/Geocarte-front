import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';

import { AgmCoreModule } from '@agm/core';
import {MatSidenavModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalComponent, ModalTemplate} from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    ModalTemplate,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,

    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAZKYezUJLxkFdkaH1pxNqJeAX8OV5Ej0	'
    })
  ],
  entryComponents: [ModalTemplate],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
