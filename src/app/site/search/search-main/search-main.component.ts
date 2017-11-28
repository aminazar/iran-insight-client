import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ii-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {
  @Input() showAll = false;
  @Input() specificTarget = null;

  constructor() { }

  ngOnInit() {
  }

}
