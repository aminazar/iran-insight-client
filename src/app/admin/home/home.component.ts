import {Component, OnInit} from '@angular/core';
import {TargetEnum} from '../../shared/enum/target.enum';
import {WindowService} from "../../shared/services/window.service";

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
    {label: 'Type', path: '/admin/type'},
  ];
  showBurgerMenu: boolean = false;
  height: number = 300;

  constructor(private windowService: WindowService) {

  }

  ngOnInit() {
    if(this.windowService.getWindow().innerWidth < 980)
      this.showBurgerMenu = true;
    else
      this.showBurgerMenu = false;

    this.height = this.windowService.getWindow().innerHeight - 100;

    this.windowService.getWindow().onresize = (e) => {
      if(this.windowService.getWindow().innerWidth < 980)
        this.showBurgerMenu = true;
      else
        this.showBurgerMenu = false;

      this.height = this.windowService.getWindow().innerHeight - 100;
    };

    // Object.keys(TargetEnum).forEach(el => {
    //   if (el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57)
    //     this.navLinks.push({
    //       label: TargetEnum[el],
    //       path: '/admin/' + el,
    //     });
    // });
  }

  menuIsOpen(data?){
    if(data){
      console.log(data);
    }

    return true;
  }
}
