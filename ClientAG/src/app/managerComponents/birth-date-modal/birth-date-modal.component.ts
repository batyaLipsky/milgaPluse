import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-birth-date-modal',
  templateUrl: './birth-date-modal.component.html',
  styleUrls: ['./birth-date-modal.component.scss']
})
export class BirthDateModalComponent implements OnInit {
  realHebrewBirthDate: string;
  onAdd = new EventEmitter();
  public constructor(
    public dialogRef: MatDialogRef<BirthDateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {  }


  ngOnInit() {
  }

  onClick(index) {
    this.onAdd.emit(this.data[index]);
  }

}
