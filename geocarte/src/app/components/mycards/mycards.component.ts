import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css']
})
export class MycardsComponent implements OnInit {

  singleCard = false;
  cardUrl = '';

  constructor() { }

  ngOnInit() {
  }

  openSingleCard() {
    this.singleCard = true;
    this.cardUrl = '../../assets/img/villard-0675-n1-2.jpg';
  }

  closeSingleCard() {
    this.singleCard = false;
  }


}
