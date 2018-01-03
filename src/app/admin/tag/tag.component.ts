import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';

@Component({
  selector: 'ii-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  id: number;
  private type: string;
  private name: string;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private activatedRoute: ActivatedRoute,
              private restService: RestService,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.type = this.router.url.split('/')[2];
      this.id = params['id'];
      this.name = decodeURIComponent(params['name']);

      this.breadCrumbService.pushChild(`tags of: ${this.name}`, this.router.url, false);

    });

  }
}
