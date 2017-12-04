import {Component, Inject, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
declare let google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 48.1246539 ;
  lng: number = -1.652399100000025;

  markers: marker[] = [
    {
      lat: 48.1246539,
      lng: -1.652399100000025,
      draggable: false,
      icon: 'red'
    },
  ];

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  clickedMarker(){
    let dialogRef = this.dialog.open(CardTemplate, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '75%'
    });
  }
  mapDoubleClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      icon: 'blue'
    });
    let dialogRef = this.dialog.open(CardTemplate, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '75%'
    });
    this.getGeoLocation($event.coords.lat, $event.coords.lng);
  }


  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            return result.formatted_address;
          } else {
            alert("No address available!");
          }
        }
      });
    }
  }
}

@Component({
  selector: 'modal-template',
  templateUrl: './card.modal.template.html',
  styleUrls: ['./card.modal.template.css']
})
export class CardTemplate {
  constructor(
    public dialogRef: MdDialogRef<CardTemplate>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
