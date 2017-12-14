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

  communes: Commune[];


  ngOnInit(): void {
    this.getCommunes();
  }

  getCommunes(): void {
    this.headerService.getCommunes()
      .then(communes => this.communes =  communes);
  }

  constructor(private headerService: HeaderService) {
    this.communeCtrl = new FormControl();
    this.filteredCommunes = this.communeCtrl.valueChanges
      .startWith(null)
      .map(commune => commune ? this.filterStates(commune) : this.communes.slice());
  }

  filterStates(name: string) {
    return this.communes.filter(commune =>
      commune.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  swapFilter() {
    this.filter = !this.filter;
  }

  firstLetter(){
    
  }
}
