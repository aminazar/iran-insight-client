import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';

import {RestService} from './rest.service';

@Injectable()
export class AuthService {
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1);
  isAdmin: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private restService: RestService, private router: Router) {
    this.restService.get('validUser').subscribe(
      (data) => {
        this.isLoggedIn.next(true);

        // let rt = 'home';
        // if (this.router.url.includes('admin'))
        //   rt = 'admin/person';

        if (data.userType === 'admin')
          this.isAdmin.next(true);
        else
          this.isAdmin.next(false);

        // this.router.navigate([rt]);
      },
      (err) => {
        console.log('Not logged in: ', err);
        this.isLoggedIn.next(false);
        this.isAdmin.next(false);

        // let rt = 'admin/login';
        // if (this.router.url.includes('admin'))
        //   rt = 'admin/' + rt;

        // this.router.navigate([rt]);
      }
    );
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.restService.post('login', {username: username, password: password}).subscribe(
        (data) => {
          this.isLoggedIn.next(true);

          if (data.userType === 'admin')
            this.isAdmin.next(true);
          else
            this.isAdmin.next(false);

          resolve();
          // let rt = 'home';
          //
          // if (this.router.url.includes('admin'))
          //   rt = 'admin/person';
          //
          // this.router.navigate([rt]);
        },
        (err) => {
          this.isLoggedIn.next(false);
          console.log('Error: ', err);
          reject();
        }
      );
    });
  }

  logout() {
    this.restService.get('logout').subscribe(
      (data) => {
        let rt = 'login';

        if (this.router.url.includes('admin'))
          rt = 'admin/' + rt;

        this.isLoggedIn.next(false);
        this.router.navigate([rt]);
      },
      (err) => {
        console.log('Cannot logout. err', err);
      }
    );
  }

  setUserProfile(data) {
    return this.restService.post('user/profile', data);
  }

  getPersonInfo(personId) {
    return this.restService.get('user/profile/' + personId);
  }

  setProductInfo(data, productId) {
    if (!productId)
      return this.restService.put('product', data);
    else
      return this.restService.post('/update-product/' + productId, data);
  }

  getProductInfo(productId) {
    return this.restService.get('/product/one/' + productId);
  }

  deletePerson(personId) {
    return this.restService.delete('user/' + personId);
  }

  deleteProduct(productId) {
    return this.restService.delete('delete-product/' + productId);
  }

  resetPassword(person_mail) {
    return this.restService.post('user/auth/link', {email: person_mail, is_forgot_mail: true});
  }

  registerWithOAuth(type) {
    return new Promise((resolve, reject) => {
      this.restService.get('login/' + type).subscribe(
        (data) => {
          if (data.userType === 'admin')
            this.isAdmin.next(true);
          else
            this.isAdmin.next(false);
          resolve();
        },
        (err) => {
          this.isLoggedIn.next(false);
          console.log('Error: ', err);
          reject();
        }
      );
    });
  }

}
