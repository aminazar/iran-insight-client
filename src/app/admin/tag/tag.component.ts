import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';
import {FormControl} from '@angular/forms';
import {ITag} from './interfaces/itag.interface';

@Component({
  selector: 'ii-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  active = true;
  id: number;
  private type: string;
  private name: string;

  id_name: string;

  suggestionCtrl: FormControl;

  filteredItems: any[] = [];
  tags: ITag[] = [];
  connectedTags: ITag[] = [];

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

        this.tags = res;
        this.progressService.disable();

      }, err => {
        this.progressService.disable();
      });


    });
    this.suggestionCtrl = new FormControl();
    this.suggestionCtrl.valueChanges.debounceTime(150).subscribe(
      (data) => {
        this.filtering(data);
      },
      (err) => {
        this.filteredItems = [];
      }
    );

  }

  filtering(phrase: string) {
    if ((!phrase || phrase === '') || phrase.length < 3)
      this.filteredItems = [];
    else {
      this.progressService.enable();
      this.restService.post('tag/getList', {
        name: phrase
      }).subscribe(
        (data) => {
          this.filteredItems = data;
          this.progressService.disable();
        },
        (err) => {
          this.filteredItems = [];
          this.progressService.disable();
        }
      );
    }
  }

  /**
   * called when suggested value of auto complete is selected
   * @param data
   */
  addItem(data) {

    const item = this.filteredItems.filter(el => el.name.toLowerCase() === data.option.value.toLowerCase())[0];
    this.add(item.name);
    this.suggestionCtrl.setValue('');
  }

  /**
   * called after value of auto complete view is selected or value in input view is entered
   * @param value
   */
  add(value): void {
    if ((value || '').trim()) {

      if (this.tags.filter(tag => tag.name === value).length !== 0)
        return;

      const body = {
        name: value,
        active: this.active
      };
      body[this.id_name] = this.id;

      this.progressService.enable();
      this.restService.put('tag/add', body).subscribe(res => {
        this.tags.push({
          tid: res.tid,
          name: value,
          active: this.active
        });
        this.suggestionCtrl.setValue('');

        this.restService.post('tag/getConnection', {name: value}).subscribe(res => {

          res.forEach((tag: ITag) => {

            if (this.tags.filter(t => t.name === tag.name).length === 0)
              this.connectedTags.push(tag);
          });

          this.progressService.disable();
        }, err => {
          this.progressService.disable();
        });


      }, err => {
        this.progressService.disable();
        this.suggestionCtrl.setValue('');

      });

    }
  }

  remove(tag: ITag): void {

    if (this.tags.filter(t => t.name === tag.name).length > 0) {

      this.progressService.enable();

      const body = {name: tag.name};
      body[this.id_name] = this.id;

      this.restService.post('tag/removeFrom', body).subscribe(res => {

        this.tags = this.tags.filter(t => t.name !== tag.name);
        this.progressService.disable();

      }, err => {
        this.progressService.disable();
      });

    }


  }

  acceptConnectedTag(tag: ITag) {

    if (this.tags.filter(t => t.name === tag.name).length > 0)
      return;

    const body = {
      name: tag.name,
      active: tag.active
    };
    body[this.id_name] = this.id;

    this.progressService.enable();
    this.restService.put('tag/add', body).subscribe(res => {
      this.tags.push(res);
      this.suggestionCtrl.setValue('');

      this.restService.post('tag/getConnection', {name: tag.name}).subscribe(res => {

        res.forEach((tag: ITag) => {
          if (this.tags.filter(t => t.name === tag.name).length === 0)
            this.connectedTags.push(tag);
        });

        this.connectedTags = this.connectedTags.filter(t => t.name !== tag.name);
        this.progressService.disable();
      }, err => {
        this.progressService.disable();
      });


    }, err => {
      this.progressService.disable();
      this.suggestionCtrl.setValue('');

    });
  }

  rejectConnectedTag(tag: ITag) {


    this.progressService.enable();

    const body = {name: tag.name};
    body[this.id_name] = this.id;

    this.restService.post('tag/removeFrom', body).subscribe(res => {

      this.connectedTags = this.connectedTags.filter(t => t.name !== tag.name);
      this.progressService.disable();

    }, err => {
      this.progressService.disable();
    });

  }

}
