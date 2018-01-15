import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ii-ending-entity',
  templateUrl: './ending-entity.component.html',
  styleUrls: ['./ending-entity.component.css']
})
export class EndingEntityComponent implements OnInit {
  name = null;

  constructor(public dialogRef: MatDialogRef<EndingEntityComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.name = (this.data && this.data.name) ? this.data.name : null;
  }

  setEnd(answer) {
    this.dialogRef.close(answer);
  }
}
