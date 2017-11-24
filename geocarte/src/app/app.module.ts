import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {CardTemplate, MapComponent} from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { MycardsComponent } from './components/mycards/mycards.component';
import { ProfilComponent } from './components/profil/profil.component';

import { AgmCoreModule } from '@agm/core';
import {MatSidenavModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalComponent, ModalTemplate} from './components/firstconnect/firstconnect.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HowtoComponent, HowToTemplate} from './components/howto/howto.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    ModalTemplate,
    ModalComponent,
    CardTemplate,
    MycardsComponent,
    ProfilComponent,
    HowtoComponent,
    HowToTemplate
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAZKYezUJLxkFdkaH1pxNqJeAX8OV5Ej0	'
    })
  ],
  entryComponents: [ModalTemplate, CardTemplate, HowToTemplate],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
