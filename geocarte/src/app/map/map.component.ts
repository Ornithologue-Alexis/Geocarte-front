import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 48.1246539;
  lng: number = -1.652399100000025;


  constructor() { }

  ngOnInit() {
  }

}
