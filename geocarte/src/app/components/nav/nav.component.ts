import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  myCards = false;
  profil = false;

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
  }

}
