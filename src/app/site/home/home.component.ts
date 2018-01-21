import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'ii-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Home', this.router.url, true);

    if (this.authService.isAdmin)
      this.router.navigate(['admin']);
  }
}
