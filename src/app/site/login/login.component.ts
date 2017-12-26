import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AuthService} from '../../shared/services/auth.service';
import {OAuthTypes} from '../../shared/enum/oauth.type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
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
        this.router.navigate(['home']);
      })
      .catch(() => {
        this.snackBar.open('Cannot login. Please try again', null, {
          duration: 3200,
        });
      });
  }
}
