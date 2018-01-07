import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {RestService} from './rest.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private defaultDisplayName = 'Anonymous user';
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject(1);
  isAdmin: ReplaySubject<boolean> = new ReplaySubject(1);
  userId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  displayName: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultDisplayName);

  constructor(private restService: RestService, private router: Router) {
    this.restService.get('validUser').subscribe(
      (data) => {
        this.isLoggedIn.next(true);
        if (data.userType === 'admin')
          this.isAdmin.next(true);
        else
          this.isAdmin.next(false);
        this.userId.next(data.pid);
        this.displayName.next(data.displayName);
      },
      (err) => {
        console.log('Not logged in: ', err);
        this.isLoggedIn.next(false);
        this.isAdmin.next(false);
        this.userId.next(null);
        this.displayName.next(this.defaultDisplayName);
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
          this.userId.next(data.pid);
          this.displayName.next(data.displayName);

          resolve();
        },
        (err) => {
          this.isLoggedIn.next(false);
          console.log('Error: ', err);
          this.isAdmin.next(false);
          this.userId.next(null);
          this.displayName.next(this.defaultDisplayName);
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
        this.isAdmin.next(false);
        this.userId.next(null);
        this.displayName.next(this.defaultDisplayName);
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

  setProductInfo(data, businessId, productId) {
    if (!productId)
      return this.restService.put('/business/product/' + businessId, data);
    else
      return this.restService.post('/business/product/' + businessId + '/' + productId , data);
  }

  getProductInfo(productId) {
    return this.restService.get('/product/one/' + productId);
  }

  getExpertiseInfo(expertiseId) {
    return this.restService.get('/expertise/' + expertiseId);
  }

  deleteProduct(businessId, productId) {
    console.log('Product deleted: ', productId);
    return this.restService.delete('business/product/' + businessId + '/' + productId);
  }

  deletePerson(personId) {
    return this.restService.delete('user/' + personId);
  }

  resetPassword(person_mail) {
    return this.restService.post('user/auth/link', {email: person_mail, is_forgot_mail: true});
  }

  sendActivationMail(email, isForgotPassword = true) {
    return this.restService.post('user/auth/link', {email: email, is_forgot_mail: isForgotPassword});
  }

  checkActivationLink(link) {
    return this.restService.get('user/activate/link/' + link);
  }

  setPassword(password, username, link) {
    return this.restService.post('user/auth/local/' + link, {
      username: username,
      password: password,
    });
  }

  signup(username, displayName) {
    return this.restService.put('user/register', {email: username, display_name: displayName});
  }

  emailExists(email) {
    return this.restService.post('user/email/isExist', {username: email});
  }

  loginCheck() {
    return new Promise((resolve, reject) => {
      this.restService.get('/validUser').subscribe(
        (data) => {
          this.isLoggedIn.next(true);
          if (data.userType === 'admin')
            this.isAdmin.next(true);
          else
            this.isAdmin.next(false);
          this.userId.next(data.pid);
          this.displayName.next(data.displayName);
          resolve();
        },
        (err) => {
          this.isLoggedIn.next(false);
          this.isAdmin.next(false);
          this.userId.next(null);
          this.displayName.next(this.defaultDisplayName);
          reject();
        }
      );
    });
  }
}
