import {Component, EventEmitter, Inject, Input, NgModule, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import {HeaderService} from "./header.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import StorageTool from "../utils/storageTool";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {MapService} from "../components/map/map.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [HeaderService],
})

export class HeaderComponent implements OnInit {

  @Input() navClosed = false;
  filter = false;

  communeCtrl: FormControl;
  filteredCommunes: Observable<any[]>;
  communes: Commune[] = [];

  typeMonumentCtrl: FormControl;
  filteredTypeMonuments: Observable<any[]>;
  typeMonuments: TypeMonument[] = [];

  editeurCtrl: FormControl;
  filteredEditeur: Observable<any[]>;
  editeurs: Editeur[] = [];


  legendeCtrl: FormControl;
  filteredLegende: Observable<any[]>;
  legendes: string[] = [];

  cartesPostales: any[] = [];

  operateurId: string = StorageTool.getIdUtilisateur();

  constructor(private headerService: HeaderService, public dialog: MatDialog) {
    this.communeCtrl = new FormControl();
    this.typeMonumentCtrl = new FormControl();
    this.editeurCtrl = new FormControl();
    this.legendeCtrl = new FormControl();
    this.filteredTypeMonuments = this.typeMonumentCtrl.valueChanges
      .startWith(null)
      .map(typemonument => typemonument ? this.filterTypeMonument(typemonument) : this.typeMonuments.slice());
    this.filteredEditeur = this.editeurCtrl.valueChanges
      .startWith(null)
      .map(editeur => editeur ? this.filterEditeur(editeur) : this.editeurs.slice());

  }

  ngOnInit(): void {
    this.getTypeMonument();
    this.getEditeur();
  }

  private getTypeMonument() {
    let datas = this.headerService.getTypeMonuments().then(data => {
      this.typeMonuments = data;
    });
  }

  private getEditeur() {
    let datas = this.headerService.getEditeurs().then(data => {
      this.editeurs = data;
    });
  }

  displayCommune(insee): string {
    if (!insee || this.communes === null || this.communes === undefined) {
      return '';
    } else {
      let index = this.communes.findIndex(commune => commune.insee === insee);
      if (index > -1) {
        return this.communes[index].nom;
      } else {
        return '';
      }
    }
  }

  filterCommune(val: string) {
    return val ? this.communes.filter((s) => new RegExp(val, 'gi').test(s.nom)) : this.communes;
  }

  displayTypeMonument(id): string {
    if (!id || this.typeMonuments === null || this.typeMonuments === undefined) {
      return '';
    } else {
      let index = this.typeMonuments.findIndex(typemonument => typemonument.id === id);
      if (index > -1) {
        return this.typeMonuments[index].libelle;
      } else {
        return '';
      }
    }
  }


  filterTypeMonument(libelle: string) {
    return libelle ? this.typeMonuments.filter((s) => new RegExp(libelle, 'gi').test(s.libelle)) : this.typeMonuments;
  }


  displayEditeur(id): string {
    if (!id || this.editeurs === null || this.editeurs === undefined) {
      return '';
    } else {
      let index = this.editeurs.findIndex(editeur => editeur.id === id);
      if (index > -1) {
        return this.editeurs[index].nom;
      } else {
        return '';
      }
    }
  }

  filterEditeur(nom: string) {
    return nom ? this.editeurs.filter((s) => new RegExp(nom, 'gi').test(s.nom)) : this.editeurs;
  }

  filterLegende(libelle: string) {
    return this.legendes.filter(legende =>
      legende.toLowerCase().indexOf(libelle.toLowerCase()) === 0);
  }

  swapFilter() {
    this.filter = !this.filter;
  }

  changementLegende(event) {
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
    if (event.srcElement.value.length >= 1) {
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

  search() {
    if (this.operateurId === undefined) this.operateurId = '';
    this.cartesPostales = [];
    this.headerService.searchCartePostale(this.communeCtrl.value, this.typeMonumentCtrl.value, this.editeurCtrl.value, this.legendeCtrl.value, this.operateurId).then(data => {
      if (data != null) {
        for (let i of data) {
          let carteA = i.varianteCarte.id;
          if (i.owned) {
            this.cartesPostales.push({
                id: carteA.id,
                idCarte: carteA.cartePostale.id,
                lat: carteA.cartePostale.latitude,
                lng: carteA.cartePostale.longitude,
                nomCommune: carteA.cartePostale.commune.nom,
                nomEditeur: carteA.cartePostale.editeur.nom,
                legende: i.varianteCarte.legende,
                nomMonument: carteA.cartePostale.monuments.nom,
                base64Photo: i.base64Photo,
                icon: 'blue',
                owned: i.owned
              }
            )
          } else {
            this.cartesPostales.push({
                id: carteA.id,
                idCarte: carteA.cartePostale.id,
                lat: carteA.cartePostale.latitude,
                lng: carteA.cartePostale.longitude,
                nomCommune: carteA.cartePostale.commune.nom,
                nomEditeur: carteA.cartePostale.editeur.nom,
                legende: i.varianteCarte.legende,
                nomMonument: carteA.cartePostale.monuments.nom,
                base64Photo: i.base64Photo,
                icon: 'red',
                owned: i.owned
              }
            );
          }
        }
      }
      const dialogRef = this.dialog.open(CardList, {
        data: {"cartesPostales": this.cartesPostales},
        panelClass: 'myapp-no-padding-dialog',
        width: '75%',
        height: '75%'
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.cartesPostales = result;
        }
      });
    });
  }


}

@Component({
  selector: 'app-modal-template',
  templateUrl: './cardlist.modal.template.html',
  styleUrls: ['./cardlist.modal.template.css'],
  providers: [MapService],
})
export class CardList {

  cartesPostales: any[];
  imgSrc: string;
  singleCard = false;
  cardUrl = '';
  cardLegend = '';
  cardLegendTwo = '';
  editor = '';
  commune = '';
  owned = false;
  idCarte;
  idVariante;
  lastCardCliqued;
  operateurId = StorageTool.getIdUtilisateur();

  constructor(public dialogRef: MatDialogRef<CardList>,
              private _sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: any,  private mapService: MapService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.cartesPostales = data.cartesPostales;
  }


  openSingleCard(carte: any) {
    this.singleCard = true;
    this.lastCardCliqued = carte;
    this.cardUrl = carte.base64Photo;
    this.cardLegend = carte.legende;
    this.cardLegendTwo = carte.legende2;
    this.editor = carte.nomEditeur;
    this.commune = carte.nomCommune;
    this.owned = carte.owned;
    this.idCarte = carte.idCarte;
  }

  closeSingleCard() {
    this.singleCard = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.cartesPostales = null;
  }
  addUserOnCard(){
    this.owned = true;
    this.cartesPostales.find(x => x.idCarte == this.lastCardCliqued.idCarte).owned = true;
    this.cartesPostales.find(x => x.idCarte == this.lastCardCliqued.idCarte).icon = 'blue';
    if (this.operateurId != '' || this.operateurId != null) {
      let datas = this.mapService.addUserOnCard(this.lastCardCliqued.idCarte, this.lastCardCliqued.id, this.operateurId).subscribe(data => {
      }, err => {
      });
    }
  }
  deleteUserOnCard() {
    this.owned = false;
    this.cartesPostales.find(x => x.idCarte == this.lastCardCliqued.idCarte).owned = false;
    this.cartesPostales.find(x => x.idCarte == this.lastCardCliqued.idCarte).icon = 'red';
    if (this.operateurId != '' || this.operateurId != null) {
      let datas = this.mapService.deleteUserOnCard(this.lastCardCliqued.idCarte, this.lastCardCliqued.id, this.operateurId).subscribe(data => {
      }, err => {
      });
    }
  }

  downloadpdf(){
    let docDefinition = { content : "" };

    for(let i of this.cartesPostales){
      console.log(i);
      docDefinition.content += 'commune=' + i.nomCommune + ', ' + 'editeur=' + i.nomEditeur + ',' + 'nocarte' + i.idCarte + '\n';

    }
    pdfMake.createPdf(docDefinition).download();
  }
}

