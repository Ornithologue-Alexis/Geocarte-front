import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menuOpen = false;
  @ViewChild('appNav') navComponent: NavComponent;

}
