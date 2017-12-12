import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  myCards = false;
  profil = false;
  @Input() signup = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.sidenav.open();
  }

  closeMenu() {
    this.sidenav.close();
  }

  openMenuPage(page: string) {
    if (page === 'myCards' && !this.myCards) {
      this.myCards = true;
      this.profil = false;
      this.signup = false;
    }else if (page === 'profil' && !this.profil) {
      this.myCards = false;
      this.profil = true;
      this.signup = false;
    }else if (page === 'signup' && !this.signup) {
      this.myCards = false;
      this.profil = false;
      this.signup = true;
    }else {
      this.myCards = false;
      this.profil = false;
      this.signup = false;
    }
    this.sidenav.close();
  }

  closeAll() {
    this.myCards = false;
    this.profil = false;
    this.signup = false;
  }

}
