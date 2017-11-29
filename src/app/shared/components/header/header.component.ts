import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ii-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {
  }

  @Input() header_title: string;

  ngOnInit() {
  }

}
