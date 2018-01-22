import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private router: Router, private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.pushChild('Login/Register', this.router.url, true);
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormBuilder().group({
      username: [null, [
        Validators.required,
        Validators.email,
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
      ]],
    });
  }

  login() {
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .then(() => {
        if (this.authService.isAdmin)
          this.router.navigate(['admin']);
        else
          this.router.navigate(['home']);
      })
      .catch(() => {
        this.snackBar.open('Cannot login. Please try again', null, {
          duration: 3200,
        });
      });
  }
}
