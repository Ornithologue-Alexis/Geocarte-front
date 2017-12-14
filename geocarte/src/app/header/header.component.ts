import {Component, NgModule, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import {HeaderService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [HeaderService],
})

export class HeaderComponent implements OnInit {


  filter: boolean = false;

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
  legendes: string[];


  ngOnInit(): void {
    // this.getCommunes();
    this.getTypeMonument();
    this.getEditeur();
    // this.getLegendes();
  }

  constructor(private headerService: HeaderService) {
    this.communeCtrl = new FormControl();
    this.typeMonumentCtrl = new FormControl();
    this.editeurCtrl = new FormControl();
    this.legendeCtrl= new FormControl();
    this.filteredCommunes = this.communeCtrl.valueChanges
      .startWith(null)
      .map(commune => commune ? this.filterCommune(commune) : this.communes.slice());
    this.filteredTypeMonuments = this.typeMonumentCtrl.valueChanges
      .startWith(null)
      .map(typemonument => typemonument ? this.filterTypeMonument(typemonument) : this.typeMonuments.slice());
    this.filteredEditeur = this.editeurCtrl.valueChanges
      .startWith(null)
      .map(editeur => editeur ? this.filterEditeur(editeur) : this.editeurs.slice());
    this.filteredLegende = this.legendeCtrl.valueChanges
      .startWith(null)
      .map(legende => legende ? this.filterEditeur(legende) : this.legendes.slice());
  }

  private getCommunes(): void {
    let datas = this.headerService.getCommunes().then(data => {
      this.communes = data;
    });
  }

  private getTypeMonument(){
    let datas = this.headerService.getTypeMonuments().then(data => {
      this.typeMonuments = data;
    });
  }

  private getEditeur() {
    let datas = this.headerService.getEditeurs().then(data => {
      this.editeurs = data;
    });
  }

  private getLegendes() {
    let datas = this.headerService.getLegendes().then(data => {
      this.legendes = data;
    });
  }

  filterCommune(nom: string) {
    return this.communes.filter(commune =>
      commune.nom.toLowerCase().indexOf(nom.toLowerCase()) === 0);
  }

  filterTypeMonument(libelle : string){
    return this.typeMonuments.filter(typemonument =>
      typemonument.libelle.toLowerCase().indexOf(libelle.toLowerCase()) === 0);
  }

  filterEditeur(libelle : string){
    return this.editeurs.filter(editeur =>
      editeur.nom.toLowerCase().indexOf(libelle.toLowerCase()) === 0);
  }

  swapFilter() {
    this.filter = !this.filter;
  }


}
