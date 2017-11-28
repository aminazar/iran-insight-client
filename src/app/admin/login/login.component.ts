import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms/forms';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Form variables
  username: string = null;
  password: string = null;

  constructor(private router : Router, private breadCrumbService : BreadcrumbService,
              private authService: AuthService) { }

  ngOnInit() {
    this.breadCrumbService.pushChild('login' , this.router.url);
  }

  login(form){
    console.log('form data: ', form.value);
    this.authService.login(form.value.username, form.value.password);
  }
}
