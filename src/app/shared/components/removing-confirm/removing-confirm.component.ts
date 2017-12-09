import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'ii-removing-confirm',
  templateUrl: './removing-confirm.component.html',
  styleUrls: ['./removing-confirm.component.css']
})
export class RemovingConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemovingConfirmComponent>) { }

  ngOnInit() {
  }

  remove(answer){
    this.dialogRef.close(answer);
  }
}
