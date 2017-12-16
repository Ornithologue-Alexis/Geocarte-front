import { Component, OnInit } from '@angular/core';
import { ProfilService } from './profil.service';
import { FormBuilder, Validators } from '@angular/forms';
import StorageTool from '../../utils/storageTool';
import { ValidationService } from '../../utils/validationService';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [ProfilService],
})
export class ProfilComponent implements OnInit {

  constructor(private profilService: ProfilService, private fb: FormBuilder) { }

  public profilForm = this.fb.group({
    email: ['', [Validators.required, ValidationService.emailValidator]],
    name: ['', Validators.required],
    oldpassword: ['', Validators.required],
    newpassword: ['', Validators.required],
    newpasswordbis: ['', Validators.required]
  });

  id = StorageTool.getIdUtilisateur();
  email = '';
  name = '';
  password = '';
  newPasswordError = false;
  oldPasswordError = false;

  ngOnInit() {
    this.profilService.getUserInfo(this.id).then(data => {
      this.profilForm.controls.name.setValue(data.nom);
      this.profilForm.controls.email.setValue(data.email);
      this.name = data.nom;
      this.email = data.email;
      this.password = data.motdepasse;
    });
  }


  updateUser(event) {
    let newEmail = this.profilForm.controls.email.value;
    let newName = this.profilForm.controls.name.value;
    let newPassword = this.profilForm.controls.newpassword.value;
    let newPasswordbis = this.profilForm.controls.newpasswordbis.value;
    let oldPassword = this.profilForm.controls.oldpassword.value;

    if (newName !== this.name || newPassword !== '' || newEmail !== this.email) {

      if (newPassword !== '') {
        if (newPassword !== newPasswordbis) {
          this.newPasswordError = true;
        } else {
          this.newPasswordError = false;
        }

        if (oldPassword !== this.password) {
          this.oldPasswordError = true;
        } else {
          this.oldPasswordError = false;
        }
      } else {
        newPassword = this.password;
      }
      if (!this.newPasswordError && !this.oldPasswordError && !this.profilForm.get('email').errors) {
        this.profilService.updateUserInfo(newEmail, this.id, newPassword, newName).subscribe(data => {
          this.name = newName;
          this.profilForm.controls.email.setValue(newEmail);
          this.profilForm.controls.name.setValue(newName);
        }, err => {
          console.log("check if any err "+err);
        });
      }
    }

    //
  }



}
