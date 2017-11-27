import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private breadCrumbService : BreadcrumbService) { }

  ngOnInit() {

    this.breadCrumbService.pushChild('login' , this.router.url);
  }

}
