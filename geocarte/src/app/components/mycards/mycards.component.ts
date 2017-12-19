import { Component, OnInit } from '@angular/core';
import { MycardsService } from './mycards.service';
import StorageTool from '../../utils/storageTool';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css'],
  providers: [MycardsService]
})
export class MycardsComponent implements OnInit {

  singleCard = false;
  cardUrl = '';
  cardLegend = '';
  cardLegendTwo = '';
  editor = '';
  commune = '';
  updateCard = false;
  cartePostales: VarianteCarte[] = [];
  id = StorageTool.getIdUtilisateur();

  constructor(private mycardsService: MycardsService) { }

  ngOnInit() {
    this.mycardsService.getUserCartes(this.id).then(data => {
      for (let i of data) {
        let variante = i.id.varianteCarte;
        this.cartePostales.push(variante);
      }
    });
  }

  openSingleCard(carte: VarianteCarte) {
    this.singleCard = true;
    this.cardUrl = carte.face;
    this.cardLegend = carte.legende;
    this.cardLegendTwo = carte.legende2;
    this.editor = carte.id.cartePostale.editeur.nom;
    this.commune = carte.id.cartePostale.commune.nom;
  }

  closeSingleCard() {
    this.singleCard = false;
  }

  openUpdateCard() {
    this.updateCard = true;
  }
}
