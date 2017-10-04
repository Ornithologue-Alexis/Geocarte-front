import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  animal: string;
  name: string;

  constructor(public dialog: MdDialog) {
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalTemplate, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'modal-template',
  templateUrl: './modal.template.html',
})
export class ModalTemplate {

  constructor(
    public dialogRef: MdDialogRef<ModalTemplate>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
