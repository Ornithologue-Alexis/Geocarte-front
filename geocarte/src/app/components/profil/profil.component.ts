import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';
import StorageTool from '../../utils/storageTool';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [ProfilService],
})
export class ProfilComponent implements OnInit {

  constructor(private profilService: ProfilService) { }

  id = StorageTool.getIdUtilisateur();
  email = '';
  name = '';
  password = '';
  oldpassword = '';
  newpassword = '';
  newpasswordBis = '';


  ngOnInit() {
    this.profilService.getUserInfo(this.id).then(data => {
      this.email = data.email;
      this.name = data.nom;
      this.password = data.motdepasse;
    });

  }


  updateUser() {
    console.log(this.email);
    this.profilService.updateUserInfo(this.id, this.email, this.newpassword, this.name);
  }



}
