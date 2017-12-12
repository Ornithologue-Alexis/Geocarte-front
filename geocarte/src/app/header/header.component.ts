import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})

export class HeaderComponent implements OnInit {

  filter : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  swapFilter() {
    this.filter = !this.filter;
  }
}
