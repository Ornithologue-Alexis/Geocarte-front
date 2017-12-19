import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../header/header.service";
import {MapService} from "./map.service";
import {NgForm} from "@angular/forms";
declare let google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService],

})
export class MapComponent implements OnInit {

  lat = 48.1246539 ;
  lng = -1.652399100000025;

  mapZoom = 8;

  lastAdressCliqued = '';

  cartePostale: CartePostale[] = [];
  lastCardCliqued: VarianteCarte;

  constructor(public dialog: MatDialog, private mapService: MapService) {
  }

  ngOnInit() {
    this.getCartes();
  }

  getCartes(){
    let datas = this.mapService.getCartePostale().then(data => {
      for(let i of data){
        let carteA = i.id.cartePostale;
        this.cartePostale.push({
            id: i.id,
            idCarte: carteA.id,
            lat: carteA.commune.latitude,
            lng: carteA.commune.longitude,
            nomCommune: carteA.commune.nom,
            nomEditeur: carteA.editeur.nom,
            legende: carteA.legende,
            nomMonument: carteA.monuments.nom,
            icon: 'red',
          }
        )
      }
    });
  }

  getCarteById(idVariante:number, idCarte){
    let datas = this.mapService.getCarteById(idVariante, idCarte).then(data => {
        Object.assign(this.lastCardCliqued, {
          id: data.id.id,
          cartePostale: data.cartePostale,
          legende: data.legende
        });
    })

  }

  // On enlève les markers si trop de zoom
  zoomChange($event){
    if($event > 13){
      this.cartePostale = [];
    }
    if($event < 13){
      if(this.cartePostale === []){
        this.getCartes();
      }
    }
  }

  clickedMarker(idVariante: number, idCarte: number) {
    let card: VarianteCarte;
    let datas = this.mapService.getCarteById(idVariante, idCarte).then(data => {
      card =  {
        id: data.id,
        cartePostale: data.cartePostale,
        legende: data.legende
      }
      const dialogRef = this.dialog.open(CardTemplateComponent, {
        data: { cartePostal : card},
        panelClass: 'myapp-no-padding-dialog',
        width: '75%',
        height: '50%'
      });
    });
  }

  mapDoubleClicked($event) {
    this.getGeoLocation($event.coords.lat, $event.coords.lng);
    const dialogRef = this.dialog.open(CardAddTemplateComponent, {
      data: { lastAdress: this.lastAdressCliqued},
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '50%'
    });
  }



  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          const resultLength = rsltAdrComponent.length;
          this.lastAdressCliqued =  result.formatted_address;
        }
      });
    }
  }
}

@Component({
  selector: 'app-modal-template',
  templateUrl: './card.modal.template.html',
  styleUrls: ['./card.modal.template.css']
})
export class CardTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './cardadd.modal.template.html',
  styleUrls: ['./cardadd.modal.template.css'],
  providers: [MapService],

})
export class CardAddTemplateComponent {

  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    private mapService: MapService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    onNoClick(): void {
      this.dialogRef.close();
    }

    createCard(cardForm: NgForm){

    }

}
