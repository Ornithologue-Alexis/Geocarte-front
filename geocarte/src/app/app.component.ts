import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/firstconnect/firstconnect.component';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('appNav') navComponent: NavComponent;
  @ViewChild('appModal') modalComponent: ModalComponent;
  @ViewChild('appHeader') headerComponent: HeaderComponent;
}
