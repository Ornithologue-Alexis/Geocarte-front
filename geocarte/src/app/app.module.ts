import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {CardAddTemplateComponent, CardTemplateComponent, MapComponent} from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { MycardsComponent } from './components/mycards/mycards.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';

import { AgmCoreModule } from '@agm/core';
import {MatSidenavModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalComponent, ModalTemplateComponent} from './components/firstconnect/firstconnect.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HowtoComponent, HowToTemplateComponent} from './components/howto/howto.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    ModalTemplateComponent,
    ModalComponent,
    CardTemplateComponent,
    MycardsComponent,
    ProfilComponent,
    SignupComponent,
    HowtoComponent,
    HowToTemplateComponent,
    HeaderComponent,
    CardAddTemplateComponent,

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
  entryComponents: [ModalTemplateComponent, CardTemplateComponent, HowToTemplateComponent, CardAddTemplateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
