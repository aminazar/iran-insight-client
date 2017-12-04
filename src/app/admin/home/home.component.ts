import {Component, OnInit} from '@angular/core';
import {TargetEnum} from '../../shared/enum/target.enum';

@Component({
  selector: 'ii-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor() {

  }

  navLinks = [];

  ngOnInit() {
    Object.keys(TargetEnum).forEach(el => {
      if (el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57)
        this.navLinks.push({
          label: el,
          path: '/admin/' + el,
        });
    });
  }
}
