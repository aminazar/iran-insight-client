import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatChipInputEvent, MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';
import {FormControl} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'ii-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  id: number;
  private type: string;
  private name: string;

  id_name: string;

  suggestionCtrl: FormControl;
  isSuggested = false;

  filteredItems: any[] = [];
  // Enter
  separatorKeysCodes = [ENTER];
  tags: string[] = [];

  Types: any = {
    ORG: 'organization',
    BIZ: 'business',
    PROD: 'product'
  };


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

      if (this.type === this.Types.BIZ)
        this.id_name = 'bid';
      else if (this.type === this.Types.ORG)
        this.id_name = 'oid';
      else if (this.type === this.Types.PROD)
        this.id_name = 'product_id';

        this.progressService.enable();

      this.restService.get(`tag/${this.type}/${this.id}`).subscribe(res => {

        if (res[0] && res[0].gettags) {
          this.tags = [];
          res[0].gettags.forEach(tag => {
            this.tags.push(tag);
          });
        }
        this.progressService.disable();

      }, err => {
        this.progressService.disable();
      });


    });
    this.suggestionCtrl = new FormControl();

  }

  addItem(data) {
    const item = this.filteredItems.filter(el => el.toLowerCase() === data.option.value.toLowerCase())[0];
    this.tags.push(item);
    this.isSuggested = true;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    if (!this.isSuggested) {
      const value = event.value;
      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
    } else {
      this.isSuggested = false;
    }
    input.value = '';
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {

      this.progressService.enable();

      const body = {name: tag};
      body[this.id_name] = this.id;

      this.restService.post('tag/removeFrom', body).subscribe(res => {

        this.tags.splice(index, 1);
        this.progressService.disable();

      }, err => {

        this.progressService.disable();
      });

    }


  }

}
