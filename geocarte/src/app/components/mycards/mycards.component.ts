import { Component, OnInit } from '@angular/core';
import { MycardsService } from './mycards.service';
import StorageTool from '../../utils/storageTool';
import { FormBuilder, Validators } from '@angular/forms';


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
  cardId: number;
  varianteId = '';
  editor = '';
  commune = '';
  updateCardModule = false;
  cartePostales: VarianteCarte[] = [];
  id = StorageTool.getIdUtilisateur();

  constructor(private mycardsService: MycardsService, private fb: FormBuilder) { }

  public updateForm = this.fb.group({
    commune: ['', Validators.required],
    editeur: ['', Validators.required],
    legende: ['', Validators.required],
  });

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
    // this.cardId = carte;
    // this.varianteId = carte.id;
    this.cardUrl = carte.face;
    this.cardLegend = carte.legende;
    this.cardLegendTwo = carte.legende2;
    // this.editor = carte.id.cartePostale.editeur.nom;
    // this.commune = carte.id.cartePostale.commune.nom;
  }

  closeSingleCard() {
    this.singleCard = false;
  }

  openUpdateCard() {
    console.log(this.updateCardModule);
    this.updateCardModule = true;
  }

  updateCard() {
    this.updateCardModule = false;
  }

  deleteCard() {

  }
}
