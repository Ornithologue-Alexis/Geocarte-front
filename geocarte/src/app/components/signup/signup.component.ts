import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../utils/validationService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  constructor(private signupService: SignupService, private fb: FormBuilder) { }

  public profilForm = this.fb.group({
    email: ['', [Validators.required, ValidationService.emailValidator]],
    name: ['', Validators.required],
    newpassword: ['', Validators.required],
    newpasswordbis: ['', Validators.required]
  });

  email = '';
  name = '';
  password = '';
  newPasswordError = false;
  @Output() userCreated: EventEmitter<any> = new EventEmitter();;

  ngOnInit() {
  }

  updateUser(event) {
    let newEmail = this.profilForm.controls.email.value;
    let newName = this.profilForm.controls.name.value;
    let newPassword = this.profilForm.controls.newpassword.value;
    let newPasswordbis = this.profilForm.controls.newpasswordbis.value;

    if (newName !== this.name || newPassword !== '' || newEmail !== this.email) {

        if (newPassword !== newPasswordbis) {
          this.newPasswordError = true;
        } else {
          this.newPasswordError = false;
        }
      }
      if (!this.newPasswordError && !this.profilForm.get('email').errors) {
        this.signupService.createUser(newEmail, newPassword, newName).subscribe(data => {
          this.name = newName;
          this.profilForm.controls.email.setValue(newEmail);
          this.profilForm.controls.name.setValue(newName);
          this.userCreated.emit(true);
        }, err => {
          console.log("check if any err "+err);
        });
      }
    }

}
