import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private router: Router,
              private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.pushChild('Changing Password', this.router.url, false);

    this.forgotForm = new FormBuilder().group({
      email: [null, [
        Validators.email,
        Validators.required,
      ]],
    });
  }

  sendActivationMail() {
    this.progressService.enable();
    this.authService.sendActivationMail(this.forgotForm.controls['email'].value, true).subscribe(
      (data) => {
        this.snackBar.open('An email send to ' + this.forgotForm.controls['email'].value, null, {
          duration: 2300
        });
        this.progressService.disable();
      },
      (err) => {
        this.snackBar.open('Cannot send an email to ' +
                            this.forgotForm.controls['email'].value +
                            '. If you are not register, please register first.', null, {
          duration: 3200
        });
        this.progressService.disable();
      }
    );
  }
}
