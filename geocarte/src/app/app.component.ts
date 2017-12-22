import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ModalComponent } from './components/firstconnect/firstconnect.component';
import { OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {ActivatedRoute} from '@angular/router';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  @ViewChild('appNav') navComponent: NavComponent;
  @ViewChild('appModal') modalComponent: ModalComponent;
  @ViewChild('appHeader') headerComponent: HeaderComponent;

  private token;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService) {}

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.token = params['activation'];
        if(this.token !== undefined) {}
        this.appService.activateUser(this.token).subscribe(data => {
          console.log('ACTIVATE : '+data);
        }, err => {
          console.log("check if any err "+err);
        });
      });
  }
}
