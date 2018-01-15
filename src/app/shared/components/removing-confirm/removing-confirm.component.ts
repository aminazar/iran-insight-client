import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'ii-removing-confirm',
  templateUrl: './removing-confirm.component.html',
  styleUrls: ['./removing-confirm.component.css']
})
export class RemovingConfirmComponent implements OnInit {
  name = null;

  constructor(public dialogRef: MatDialogRef<RemovingConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.name = (this.data && this.data.name) ? this.data.name : null;
  }

  remove(answer) {
    this.dialogRef.close(answer);
  }
}
