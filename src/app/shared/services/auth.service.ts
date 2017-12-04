import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ReplaySubject} from "rxjs";

import {RestService} from "./rest.service";

@Injectable()
export class AuthService {
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private restService: RestService, private router: Router) {
    this.restService.get('validUser').subscribe(
      (data) => {
        this.isLoggedIn.next(true);
        console.log('You are logged in');
        this.router.navigate(['admin/type']);
      },
      (err) => {
        console.log('Not logged in: ', err);
        this.isLoggedIn.next(false);
        this.router.navigate(['admin/login']);
      }
    );
  }

  login(username, password){
    this.restService.post('login', {username: username, password: password}).subscribe(
      (data) => {
        this.isLoggedIn.next(true);
        this.router.navigate(['admin/type']);
      },
      (err) => {
        this.isLoggedIn.next(false);
        console.log('Error: ', err);
      }
    )
  }

  setUserProfile(data){
    return this.restService.post('user/profile', data);
  }

  getPersonInfo(personId){
    return this.restService.get('user/profile/' + personId);
  }

  setProductInfo(data){
    return this.restService.put('product', data);
  }

  getProductInfo(productId){
    return this.restService.get('/product/one/' + productId);
  }
}
