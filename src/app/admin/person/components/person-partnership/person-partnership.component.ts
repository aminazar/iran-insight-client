import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ii-person-partnership',
  templateUrl: './person-partnership.component.html',
  styleUrls: ['./person-partnership.component.css']
})
export class PersonPartnershipComponent implements OnInit {
  @Input() personId: number = null;

  constructor() { }

  ngOnInit() {
  }

}
