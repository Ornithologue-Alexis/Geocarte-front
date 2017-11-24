import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  myCards = false;
  profil = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  openMenuPage(page:string)
  {
    if(page === "myCards" && !this.myCards)
    {
      this.myCards = true;
      this.profil = false;
    }else if(page === "profil" && !this.profil){
      this.myCards = false;
      this.profil = true;
    }else{
      this.myCards = false;
      this.profil = false;
    }
    this.sidenav.close();
  }

  closeAll(){
    this.myCards = false;
    this.profil = false;
  }

}
