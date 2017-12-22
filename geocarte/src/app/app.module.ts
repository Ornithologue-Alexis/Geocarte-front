import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CardAddTemplateComponent, CardTemplateComponent, MapComponent} from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { MycardsComponent } from './components/mycards/mycards.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { AgmCoreModule } from '@agm/core';
import {MatInputModule, MatSidenavModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material';
import {ModalComponent, ModalTemplateComponent} from './components/firstconnect/firstconnect.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HowtoComponent, HowToTemplateComponent} from './components/howto/howto.component';
import {CardList, HeaderComponent} from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


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
    CardList
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    MatSidenavModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAZKYezUJLxkFdkaH1pxNqJeAX8OV5Ej0	'
    })
  ],
  entryComponents: [ModalTemplateComponent, CardTemplateComponent, HowToTemplateComponent, CardAddTemplateComponent, CardList],
  providers: [HttpClientModule, HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
