import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private authService: AuthService, private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Login', this.router.url, true);
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.email,
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid || (this.form.value.username === 'admin' && this.form.value.password === 'admin' )) {
      this.authService.login(this.form.value.username, this.form.value.password)
        .then(() => {
          this.router.navigate(['admin/person']);
        })
        .catch(() => {
          this.snackBar.open('Cannot login. Please try again', null, {
            duration: 3200,
          });
        });
    }
  }
}
