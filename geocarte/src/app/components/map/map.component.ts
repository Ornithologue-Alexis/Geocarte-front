import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 7.539988999999998;
  lng: number = -5.547080000000051;


  constructor() { }

  ngOnInit() {
  }

}
