import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import { FirstconnectService } from './firstconnect.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-modal-component',
  templateUrl: './firstconnect.component.html',
  styleUrls: ['./firstconnect.component.css'],
  providers: [FirstconnectService],

})
export class ModalComponent {

  openSignup: boolean;
  users: User[] = new Array();
  identifiant = '';
  password = '';

  constructor(public dialog: MatDialog, private firstconnectService: FirstconnectService) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTemplateComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined') {
        if (result === true) {
          this.openSignup = result;
        } else {
          this.identifiant = result.identifiant;
          this.password = result.password;
          console.log(this.password);
        }
      }
      /*
      this.openSignup = result;
      let datas = this.firstconnectService.getAllUsers().then(data => {
        this.users = data;
        console.log(this.users);
      });
      */
    });
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './firstconnect.template.html',
  styleUrls: ['./firstconnect.component.css']
})
export class ModalTemplateComponent {

  openSignup = false;
  password = '';
  identifiant = '';

  constructor(
    public dialogRef: MatDialogRef<ModalTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSignupPanel() {
    this.openSignup = true;
    this.dialogRef.close(this.openSignup);
  }

  submitLogIn() {
    let data = {password : this.password, identifiant : this.identifiant};

    this.dialogRef.close(data);
  }

}
