import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {RestService} from "../../../../shared/services/rest.service";
import {MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'ii-person-partnership',
  templateUrl: './person-partnership.component.html',
  styleUrls: ['./person-partnership.component.css']
})
export class PersonPartnershipComponent implements OnInit {
  @Input() personId: number = null;
  partnerCtrl: FormControl;
  filteredPeople: Observable<any[]>;
  personPartnershipList: any[]  = [];

  constructor(private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.partnerCtrl = new FormControl();
  }

  addPartner(person_name){

  }

  removePersonPartnership(partnership_id){

  }
}
