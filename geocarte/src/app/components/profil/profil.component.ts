import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [ProfilService],
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
