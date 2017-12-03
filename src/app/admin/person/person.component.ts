import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private router: Router, private breadCrumbService: BreadcrumbService ) { }

  ngOnInit() {
    this.breadCrumbService.pushChild('Person', this.router.url , true);

  }

}
