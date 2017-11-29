import { Component, OnInit } from '@angular/core';
import {TargetEnum} from "../../shared/enum/target.enum";

@Component({
  selector: 'ii-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {
  targetEnum = TargetEnum;
  tabsInfo = [];
  activeTabNumber: number = 0;

  constructor() { }


  navLinks =[
    {
      label: 'type',
      path: '/admin/type'
    }
  ];


  ngOnInit() {
    Object.keys(this.targetEnum).forEach(el => {
      if(el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57)
        this.tabsInfo.push({title: el, index: this.targetEnum[el]});
    });
  }

  changeTab(tabIndex){
    this.activeTabNumber = tabIndex;
  }
}
