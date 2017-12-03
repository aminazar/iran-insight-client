import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('login', this.router.url);
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid || (this.form.value.username === 'admin' && this.form.value.password === 'admin' )) {
      console.log('form data: ', this.form.value);
      this.authService.login(this.form.value.username, this.form.value.password);
    }
  }
}
