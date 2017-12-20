import { Component, OnInit } from '@angular/core';
import { MycardsService } from './mycards.service';
import StorageTool from '../../utils/storageTool';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {HeaderService} from '../../header/header.service';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css'],
  providers: [MycardsService, HeaderService]
})
export class MycardsComponent implements OnInit {

  singleCard = false;
  cardUrl = '';
  cardLegend = '';
  cardLegendTwo = '';
  varianteId: VarianteCarte;
  editor = '';
  cardCommune = '';

  createNewEditor = false;

  communeCtrl: FormControl;
  filteredCommunes: Observable<any[]>;
  communes: Commune[] = [];

  editeurCtrl: FormControl;
  filteredEditeur: Observable<any[]>;
  editeurs: Editeur[] = [];


  legendeCtrl: FormControl;
  filteredLegende: Observable<any[]>;
  legendes: string[] = [];

  newEditorCtrl: FormControl;
  newEditorNumber: FormControl;

  updateCardModule = false;
  cartePostales: VarianteCarte[] = [];
  id = StorageTool.getIdUtilisateur();

  constructor(private mycardsService: MycardsService, private headerService: HeaderService, public dialog: MatDialog) {
    this.communeCtrl = new FormControl();
    this.editeurCtrl = new FormControl();
    this.legendeCtrl = new FormControl();
    this.newEditorCtrl = new FormControl();
    this.newEditorNumber = new FormControl();
    this.filteredEditeur = this.editeurCtrl.valueChanges
      .startWith(null)
      .map(editeur => editeur ? this.filterEditeur(editeur) : this.editeurs.slice());
  }

  ngOnInit() {
    this.mycardsService.getUserCartes(this.id).then(data => {
      for (let i of data) {
        let variante = i.id.varianteCarte;
        this.cartePostales.push(variante);
      }
    });
    this.getEditeur();
  }

  openSingleCard(carte: VarianteCarte) {
    this.singleCard = true;
    this.varianteId = carte.id;
    this.cardUrl = carte.face;
    this.cardLegend = carte.legende;
    this.cardLegendTwo = carte.legende2;
    this.editor = carte.id.cartePostale.editeur.nom;
    this.cardCommune = carte.id.cartePostale.commune.nom;
  }

  closeSingleCard() {
    this.singleCard = false;
  }

  openUpdateCard() {
    this.updateCardModule = true;
  }

  updateCard() {
    this.updateCardModule = false;
    console.log(this.editeurCtrl.value);
    this.mycardsService.updateCardInfo(+this.varianteId.cartePostale.id, +this.varianteId.id, this.communeCtrl.value, +this.editeurCtrl.value, this.legendeCtrl.value).subscribe(data => {
      console.log(data);
    }, err => {
      console.log("check if any err "+err);
    });
  }

  deleteCard(variante: VarianteCarte) {
    this.mycardsService.deleteCard(+this.id, +variante.cartePostale.id, +variante.id).subscribe(data => {
          console.log('ça fonctionne du tonnerre. Pardi.');
        }, err => {
          console.log("check if any err "+err);
        });
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

}


