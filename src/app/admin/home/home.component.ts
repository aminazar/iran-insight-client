import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ii-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor() { }


  navLinks =[

    {
      label: 'type',
      path: '/admin/type'
    }
  ];


  ngOnInit() {
  }

}
