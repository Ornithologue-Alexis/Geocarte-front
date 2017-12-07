import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.less']
})
export class HowtoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(HowToTemplateComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '75%'
    });
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './howto.modal.template.html',
  styleUrls: ['./howto.modal.template.css']
})
export class HowToTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<HowToTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
