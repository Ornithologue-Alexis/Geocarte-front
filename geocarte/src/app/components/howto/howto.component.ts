import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.less']
})
export class HowtoComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openModal(){
    let dialogRef = this.dialog.open(HowToTemplate, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '75%'
    });
  }

}

@Component({
  selector: 'modal-template',
  templateUrl: './howto.modal.template.html',
  styleUrls: ['./howto.modal.template.css']
})
export class HowToTemplate {
  constructor(
    public dialogRef: MdDialogRef<HowToTemplate>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
