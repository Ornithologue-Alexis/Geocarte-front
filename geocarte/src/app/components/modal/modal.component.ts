import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']

})
export class ModalComponent {

  constructor(public dialog: MdDialog) {
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalTemplate, {
      panelClass: 'myapp-no-padding-dialog',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'modal-template',
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.component.css']
})
export class ModalTemplate {

  constructor(
    public dialogRef: MdDialogRef<ModalTemplate>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
