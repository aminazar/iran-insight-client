import {Component, Input, OnInit} from '@angular/core';

import {ProgressService} from "../../services/progress.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ii-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() header_title: string;
  isLoggedIn: boolean = false;
  showProgressing: boolean = false;
  color: any = 'primary';
  mode: any;
  value: any;
  bufferValue: any;

  constructor(private progressService: ProgressService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      (data) => this.isLoggedIn = data,
      (err) => {
        this.isLoggedIn = false;
        console.log('Error when subscribing on authService.isLoggedIn: ', err);
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
}
