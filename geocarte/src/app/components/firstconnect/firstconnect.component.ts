import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import { FirstconnectService } from './firstconnect.service';
import StorageTool from '../../utils/storageTool';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-modal-component',
  templateUrl: './firstconnect.component.html',
  styleUrls: ['./firstconnect.component.css'],
  providers: [FirstconnectService]
})
export class ModalComponent implements OnInit {

  openSignup: boolean;
  @Input() isConnected: boolean;
  @Input() navOpened: boolean;
  user: User;
  login = '';
  password = '';

  constructor(public dialog: MatDialog, private firstconnectService: FirstconnectService) {
  }

  ngOnInit() {
    if (!StorageTool.isEmpty()) {
      this.isConnected = true;
    } else {
      this.openDialog();
    }
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
          this.login = result.login;
          this.password = result.password;
          this.firstconnectService.getUser(this.login, this.password).then(data => {
            this.user = data;
            if (this.user !== null) {
              StorageTool.setIdUtilisateur(this.user.id);
              this.isConnected = true;
            }
          });
        }
      }
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
  login = '';

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
    let data = {password : this.password, login : this.login};

    this.dialogRef.close(data);
  }

}
