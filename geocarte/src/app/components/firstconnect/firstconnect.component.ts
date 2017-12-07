import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-modal-component',
  templateUrl: './firstconnect.component.html',
  styleUrls: ['./firstconnect.component.css']

})
export class ModalComponent {

  constructor(public dialog: MatDialog) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTemplateComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './firstconnect.template.html',
  styleUrls: ['./firstconnect.component.css']
})
export class ModalTemplateComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
