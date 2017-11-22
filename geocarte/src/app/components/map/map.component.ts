import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 48.117266 ;
  lng: number = -1.6777925999999752;

  constructor() { }

  ngOnInit() {
  }

  clickedMarker(){
    console.log("ici");
  }
}
