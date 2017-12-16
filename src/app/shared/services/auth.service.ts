import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {RestService} from './rest.service';

@Injectable()
export class AuthService {
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private restService: RestService, private router: Router) {
    this.restService.get('validUser').subscribe(
      (data) => {
        this.isLoggedIn.next(true);
        console.log('You are logged in');
        this.router.navigate(['admin/person']);
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
        this.router.navigate(['admin/person']);
      },
      (err) => {
        this.isLoggedIn.next(false);
        console.log('Error: ', err);
      }
    )
  }

  logout(){
    this.restService.get('logout').subscribe(
      (data) => {
        this.router.navigate(['admin/login']);
        this.isLoggedIn.next(false);
      },
      (err) => {
        console.log('Cannot logout. err', err);
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

  deletePerson(personId){
    return this.restService.delete('user/'+ personId);
  }

  deleteProduct(productId) {
    // return this.restService.delete('/business/product', productId);
    console.log('Product deleted: ', productId);
    return productId;
  }

  resetPassword(person_mail){
    return this.restService.post('user/auth/link', {email: person_mail, is_forgot_mail: true});
  }
}
