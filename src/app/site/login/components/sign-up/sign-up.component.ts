import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router} from '@angular/router';
import {ProgressService} from '../../../../shared/services/progress.service';

@Component({
  selector: 'ii-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  shouldDisabledButton = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private breadcrumbService: BreadcrumbService, private router: Router,
              private progressService: ProgressService) {
  }

  ngOnInit() {
    this.breadcrumbService.pushChild('Sign Up', this.router.url, false);
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormBuilder().group({
      email: [null, [
        Validators.required,
        Validators.email,
      ]],
      displayName: [null, [
        Validators.required,
      ]],
    });

    this.signupForm.controls['email'].valueChanges.debounceTime(400).subscribe(
      (data) => {
        if (data && data.trim().length > 0)
          this.authService.emailExists(data).subscribe(
            (rs) => {
              if (rs)
                this.signupForm.controls['email'].setErrors({'exists': true});
              else
                this.signupForm.controls['email'].setErrors(null);
            }
          );
      },
      (err) => {
        console.error('Cannot check email existence in server');
      }
    );
  }

  signup() {
    this.progressService.enable();
    this.shouldDisabledButton = true;
    this.authService.signup(this.signupForm.controls['email'].value, this.signupForm.controls['displayName'].value).subscribe(
      (data) => {
        this.progressService.disable();
        this.shouldDisabledButton = false;
        this.snackBar.open('An activation mail sent to ' + this.signupForm.controls['email'].value, null, {
          duration: 2300,
        });
      },
      (err) => {
        this.progressService.disable();
        this.shouldDisabledButton = false;
        this.snackBar.open('Cannot send you an activation mail. Please check your email address', null, {
          duration: 3200,
        });
        console.error('Error when signup. Error: ', err);
      }
    );
  }
}
