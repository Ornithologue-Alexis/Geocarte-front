import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/firstconnect/firstconnect.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('appNav') navComponent: NavComponent;
  @ViewChild('appModal') modalComponent: ModalComponent;

}
