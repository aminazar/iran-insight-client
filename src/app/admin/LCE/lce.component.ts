import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';
import {ILCE} from './interfaces/lce.interface';

@Component({
  selector: 'ii-lce',
  templateUrl: './lce.component.html',
  styleUrls: ['./lce.component.css']
})
export class LCEComponent implements OnInit {


  joinerType: string;
  joinerId: number = null;
  name: string = null;
  showInDeep = false;
  LCEs: ILCE[] = [];

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private activatedRoute: ActivatedRoute,
              private restService: RestService) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.joinerType = params['type'];
      this.joinerId = params['id'];

      this.progressService.enable();

      this.LCEs = [];
      this.restService.get(`lce/${this.joinerType}/${this.joinerId}`).subscribe(res => {

        res.forEach((lce: ILCE) => {
          this.LCEs.push(lce);

        });
        this.progressService.disable();
      }, err => {
        this.progressService.disable();

      });

    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'] || '';
      this.breadCrumbService.pushChild(this.name !== '' ? `lce for ${this.name} ` : 'lce', this.router.url, false);

    });

  }

  openForm(lceId: number = null): void {


    if (!lceId)
      this.router.navigate(['add'], {relativeTo: this.activatedRoute});

  }


}
