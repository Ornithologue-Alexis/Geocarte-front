import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../header/header.service";
import {MapService} from "./map.service";
import {NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import StorageTool from "../../utils/storageTool";
import {MycardsService} from "../mycards/mycards.service";
declare let google: any;
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';


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

  operateurId: string = StorageTool.getIdUtilisateur();

  @Input() cartesPostales: any[] = [];
  lastCardCliqued: VarianteCarte;

  constructor(public dialog: MatDialog, private mapService: MapService) {
  }

  ngOnInit() {
    this.getCartes();
  }

  getCartes(){
    if(this.operateurId === undefined) this.operateurId = '';
    let datas = this.mapService.getCartePostale(this.operateurId).then(data => {
      for(let i of data){
        let carteA = i.varianteCarte.id.cartePostale;
          if(i.owned){
            this.cartesPostales.push({
                id: i.varianteCarte.id.id,
                idCarte: carteA.id,
                lat: carteA.latitude,
                lng: carteA.longitude,
                nomCommune: carteA.commune.nom,
                nomEditeur: carteA.editeur.nom,
                legende: carteA.legende,
                nomMonument: carteA.monuments.nom,
                icon: 'blue',
                owned: i.owned
              }
            );
          }else{
            this.cartesPostales.push({
                id: i.varianteCarte.id.id,
                idCarte: carteA.id,
                lat: carteA.latitude,
                lng: carteA.longitude,
                nomCommune: carteA.commune.nom,
                nomEditeur: carteA.editeur.nom,
                legende: carteA.legende,
                nomMonument: carteA.monuments.nom,
                icon: 'red',
                owned: i.owned
              }
            );
          }
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
  markerDragEnd(m: any, $event: any) {
    let lat = $event.coords.lat;
    let lng = $event.coords.lng;
    let id = m.idCarte
    this.mapService.changeLatLngMarker(id, lng, lat).subscribe(data => {

    }, err => {
    });
  }

  clickedMarker(idVariante: number, idCarte: number, owned: boolean) {
    let card: VarianteCarte;
    let datas = this.mapService.getCarteById(idVariante, idCarte).then(data => {
      data.owned = owned;
      const dialogRef = this.dialog.open(CardTemplateComponent, {
        data: { cartePostal : data},
        panelClass: 'myapp-no-padding-dialog',
        width: '75%',
        height: '50%'
      });
    });
  }

  mapDoubleClicked($event) {
    this.getGeoLocation($event.coords.lat, $event.coords.lng);
    const dialogRef = this.dialog.open(CardAddTemplateComponent, {
      data: { lastAdress: this.lastAdressCliqued, lat: $event.coords.lat, long: $event.coords.lng},
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
  styleUrls: ['./card.modal.template.css'],
  providers: [MapService],
})
export class CardTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _sanitizer: DomSanitizer,  private mapService: MapService) {
    // console.log(this.data);


  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  addUserOnCard(){
    this.data.cartePostal.owned = true;
    if(StorageTool.getIdUtilisateur() != '' || StorageTool.getIdUtilisateur() != null){
      let datas = this.mapService.addUserOnCard(this.data.cartePostal.varianteCarte.id.cartePostale.id, this.data.cartePostal.varianteCarte.id.id, StorageTool.getIdUtilisateur()).subscribe(data => {

      }, err => {
      });
    }
  }

  deleteUserOnCard(){
    this.data.cartePostal.owned = false;
    if(StorageTool.getIdUtilisateur() != '' || StorageTool.getIdUtilisateur() != null){
      let datas = this.mapService.deleteUserOnCard(this.data.cartePostal.varianteCarte.id.cartePostale.id, this.data.cartePostal.varianteCarte.id.id, StorageTool.getIdUtilisateur()).subscribe(data => {
      }, err => {
      });
    }
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './cardadd.modal.template.html',
  styleUrls: ['./cardadd.modal.template.css'],
  providers: [MapService, MycardsService, HeaderService],

})
export class CardAddTemplateComponent implements OnInit {

  createNewEditor = false;
  base64textString = '';

  communeCtrl: FormControl;
  filteredCommunes: Observable<any[]>;
  communes: Commune[] = [];

  editeurCtrl: FormControl;
  filteredEditeur: Observable<any[]>;
  editeurs: Editeur[] = [];


  legendeCtrl: FormControl;
  filteredLegende: Observable<any[]>;
  legendes: string[] = [];

  codeEditeurCtrl: FormControl;
  imageCtrl: FormControl;

  newEditorCtrl: FormControl;
  newEditorNumber: FormControl;
  currentUserId: string = StorageTool.getIdUtilisateur();

  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    private mapService: MapService, private mycardsService: MycardsService, private headerService: HeaderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.communeCtrl = new FormControl();
      this.editeurCtrl = new FormControl();
      this.legendeCtrl = new FormControl();
      this.codeEditeurCtrl = new FormControl();
      this.imageCtrl = new FormControl();
      this.newEditorCtrl = new FormControl();
      this.newEditorNumber = new FormControl();
      this.filteredEditeur = this.editeurCtrl.valueChanges
        .startWith(null)
        .map(editeur => editeur ? this.filterEditeur(editeur) : this.editeurs.slice());
    }

  ngOnInit() {
    this.getEditeur();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getEditeur() {
    let datas = this.mycardsService.getAllEditeurs().then(data => {
      this.editeurs = data;
    });
  }


  private getNewEditeur(id: string) {
    let datas = this.mycardsService.getAllEditeurs().then(data => {
      this.editeurs = data;
      this.filteredEditeur = this.editeurCtrl.valueChanges
        .startWith(null)
        .map(editeur => editeur ? this.filterEditeur(editeur) : this.editeurs.slice());
      this.displayEditeur(id);
    });
  }

  displayCommune(insee): string {
    if (!insee || this.communes === null || this.communes === undefined) {
      return '';
    } else {
      let index = this.communes.findIndex(commune => commune.insee === insee);
      if (index > -1) {
        return this.communes[index].nom;
      } else { return ''; }
    }
  }

  filterCommune(val: string) {
    return val ? this.communes.filter((s) => new RegExp(val, 'gi').test(s.nom)) : this.communes;
  }

  displayEditeur(id): string {
    if (!id || this.editeurs === null || this.editeurs === undefined) {
      return '';
    } else {
      let index = this.editeurs.findIndex(editeur => editeur.id === id);
      if (index > -1) {
        return this.editeurs[index].nom;
      } else { return ''; }
    }
  }

  filterEditeur(nom: string) {
    return nom ? this.editeurs.filter((s) => new RegExp(nom, 'gi').test(s.nom)) : this.editeurs;
  }

  filterLegende(libelle: string) {
    return this.legendes.filter(legende =>
      legende.toLowerCase().indexOf(libelle.toLowerCase()) === 0);
  }

  changementLegende(event) {
    console.log(event);
    if (event.target.value.length >= 1) {
      this.headerService.getLegendesWithBeginning(event.target.value).then(data => {
        this.legendes = data;
      });
      if (this.legendes != null) {
        this.filteredLegende = this.legendeCtrl.valueChanges
          .startWith(null)
          .map(legende => legende ? this.filterLegende(legende) : this.legendes.slice());
      }
    } else {
      this.legendes = [];
      this.filteredLegende = null;
    }
  }

  changementCommune(event) {
    if (event.target.value.length >= 1) {
      this.headerService.getCommunesWithBeginning(event.target.value).then(data => {
        this.communes = data;
      });
      if (this.communes != null) {
        this.filteredCommunes = this.communeCtrl.valueChanges
          .startWith(null)
          .map(commune => commune ? this.filterCommune(commune.nom) : this.communes.slice());
      }
    } else {
      this.communes = [];
      this.filteredCommunes = null;
    }
  }

  openNewEditor() {
    console.log(this.createNewEditor = true);
    this.createNewEditor = true;
  }

  closeNewEditor() {
    this.createNewEditor = false;
  }

  addEditor() {
    let newCode = this.newEditorNumber.value;
    let newName = this.newEditorCtrl.value;
    this.mycardsService.createNewEditor(newName, newCode).subscribe(data => {
      this.getNewEditeur(data.id);
      this.createNewEditor = false;
    }, err => {
      console.log("check if any err "+err);
    });
  }

  addCard() {
    this.mapService.addCard(this.base64textString, this.codeEditeurCtrl.value, this.communeCtrl.value, +this.editeurCtrl.value, this.legendeCtrl.value, this.data.lat, this.data.long).subscribe(data => {
      console.log(data.id);
      this.mapService.addUserOnCard(data.id, 1, this.currentUserId).subscribe(rep => {
        console.log(rep);
      }, err => {
        console.log("check if any err "+err);
      });
    }, err => {
      console.log("check if any err "+err);
    });
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

}
