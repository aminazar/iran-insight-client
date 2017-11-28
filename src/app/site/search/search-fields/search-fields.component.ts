import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TargetEnum} from '../target.enum';

declare var Materialize: any;


@Component({
  selector: 'ii-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {
  @Input() target = null;
  @Output() searching = new EventEmitter<boolean>();
  targetEnum = TargetEnum;

  //View variables
  phrase = null;
  amount = null;
  isEducation = false;
  isLead = false;
  isMentor = false;

  constructor() { }

  ngOnInit() {

  }

  getResults(){
    this.searching.emit(true);
  }
}
