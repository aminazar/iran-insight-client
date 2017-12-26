import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.css']
})
export class ChoosePasswordComponent implements OnInit {
  link = null;
  username = null;
  canChoosePassword = false;
  changePassForm: FormGroup;
  shouldDisabledButton = false;

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private snackBar: MatSnackBar, private progressService: ProgressService,
              private router: Router, private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.pushChild('Changing Password', this.router.url, false);

    this.initForm();
    this.progressService.enable();
    this.route.params.subscribe(
      (params) => {
        this.link = params['link'];
        if (this.link && this.link.trim().length > 0) {
          this.authService.checkActivationLink(this.link).subscribe(
            (data) => {
              this.username = data.username;
              this.canChoosePassword = true;
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              this.snackBar.open('This link is expired probably.', null, {
                duration: 3200,
              });
            }
          );
        }
      },
      (err) => {
        console.error('Error in getting url parameters. Error: ', err);
        this.snackBar.open('No link found', null, {
          duration: 3200,
        });
      }
    );
  }

  initForm() {
    this.changePassForm = new FormBuilder().group({
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
      ]],
      rePassword: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
      ]],
    }, {validator: this.matchPasswords});
  }

  matchPasswords(AC: AbstractControl) {
    const password = AC.get('password').value;
    const rePassword = AC.get('rePassword').value;

    if (password !== rePassword) {
      AC.get('rePassword').setErrors({'matchPassword': 'Passwords are not matched'});
    } else {
      return null;
    }
  }

  setPassword() {
    this.progressService.enable();
    this.shouldDisabledButton = true;
    this.authService.setPassword(this.changePassForm.controls['password'].value, this.username, this.link).subscribe(
      (data) => {
        this.snackBar.open('Your password changed successfully.', null, {
          duration: 2300,
        });
        this.progressService.disable();
        this.shouldDisabledButton = false;
        setTimeout(() => this.router.navigate(['login']), 1000);
      },
      (err) => {
        this.snackBar.open('Cannot change your password. Maybe link is expired', null, {
          duration: 2300,
        });
        this.progressService.disable();
        this.shouldDisabledButton = false;
      }
    );
  }
}
