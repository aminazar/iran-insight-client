import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private breadcrumbService: BreadcrumbService, private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbService.pushChild('Sign Up', this.router.url, true);
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
                this.signupForm.controls['email'].setErrors({'exists': null});
            }
          );
      },
      (err) => {
        console.error('Cannot check email existence in server');
      }
    );
  }

  signup() {
    this.authService.signup(this.signupForm.controls['username'].value, this.signupForm.controls['displayName'].value).subscribe(
      (data) => {
        this.snackBar.open('An activation mail sent to ' + this.signupForm.controls['username'].value, null, {
          duration: 2300,
        });
      },
      (err) => {
        this.snackBar.open('Cannot send you an activation mail. Please check your email address', null, {
          duration: 3200,
        });
        console.error('Error when signup. Error: ', err);
      }
    );
  }
}
