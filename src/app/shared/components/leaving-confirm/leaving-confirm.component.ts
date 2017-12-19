import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'ii-leaving-confirm',
  templateUrl: './leaving-confirm.component.html',
  styleUrls: ['./leaving-confirm.component.css']
})
export class LeavingConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LeavingConfirmComponent>) { }

  ngOnInit() {
  }

  leave(answer){
    this.dialogRef.close(answer);
  }

}
