import {Component, Inject, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 48.117266 ;
  lng: number = -1.6777925999999752;

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  clickedMarker(){
    let dialogRef = this.dialog.open(CardTemplate, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '75%'
    });
  }
}

@Component({
  selector: 'modal-template',
  templateUrl: './card.modal.template.html',
  styleUrls: ['./card.modal.template.css']
})
export class CardTemplate {
  constructor(
    public dialogRef: MdDialogRef<CardTemplate>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
