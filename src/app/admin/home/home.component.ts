import {Component, OnInit} from '@angular/core';
import {TargetEnum} from '../../shared/enum/target.enum';

@Component({
  selector: 'ii-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {
  navLinks = [
    {label: 'Person', path: '/admin/person'},
    {label: 'Business', path: '/admin/business'},
    {label: 'Organization', path: '/admin/organization'},
    {label: 'Product', path: '/admin/product'},
    {label: 'Event', path: '/admin/event'},
  ];

  constructor() {

  }

  ngOnInit() {
    // Object.keys(TargetEnum).forEach(el => {
    //   if (el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57)
    //     this.navLinks.push({
    //       label: TargetEnum[el],
    //       path: '/admin/' + el,
    //     });
    // });
  }
}
