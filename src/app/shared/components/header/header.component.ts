import {Component, Input, OnInit} from '@angular/core';

import {ProgressService} from '../../services/progress.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() header_title: string;
  isLoggedIn = false;
  showProgressing = false;
  color: any = 'primary';
  mode: any;
  value: any;
  bufferValue: any;
  btnLabel = '';

  constructor(private progressService: ProgressService, public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (data) => {
        this.isLoggedIn = data;
        this.btnLabel = data && !!this.authService.displayName.getValue() ? this.authService.displayName.getValue() : 'Logout';
      },
      (err) => {
        this.isLoggedIn = false;
        console.error('Error when subscribing on authService.isLoggedIn: ', err);
      }
    );

    this.authService.displayName.subscribe(
      (data) => {
        this.btnLabel = data;
      },
      (err) => {
        console.error('Error when subscribing on authService.displayName: ', err);
      }
    );

    this.progressService.showProgress.subscribe(
      (data) => this.showProgressing = data,
      (err) => {
        this.showProgressing = false;
        console.error('An error occurred when subscribing on showProgress in progressService: ', err);
      }
    );

    this.progressService.progressMode.subscribe(
      (data) => this.mode = data,
      (err) => {
        this.mode = null;
        console.error('An error occurred when subscribing on progressMode in progressService: ', err);
      }
    );

    this.progressService.progressValue.subscribe(
      (data) => this.value = data,
      (err) => {
        this.value = null;
        console.error('An error occurred when subscribing on progressValue in progressService: ', err);
      }
    );

    this.progressService.progressBufferValue.subscribe(
      (data) => this.bufferValue = data,
      (err) => {
        this.bufferValue = null;
        console.error('An error occurred when subscribing on progressBufferValue in progressService: ', err);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  showProfile() {
    let tr = '/';

    if (this.router.url.includes('admin'))
      tr = '/admin/';

    this.router.navigate([tr + 'profile']);
  }
}
