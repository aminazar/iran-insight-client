import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router : Router, private breadCrumbService : BreadcrumbService) { }

  ngOnInit() {

    this.breadCrumbService.pushChild('Profile' , this.router.url);
  }




}
