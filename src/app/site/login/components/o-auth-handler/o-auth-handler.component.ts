import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ii-o-auth-handler',
  templateUrl: './o-auth-handler.component.html',
  styleUrls: ['./o-auth-handler.component.css']
})
export class OAuthHandlerComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loginCheck()
      .then(res => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.router.navigate(['/login']);
      });
  }

}
