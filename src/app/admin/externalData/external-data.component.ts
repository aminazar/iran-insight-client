import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ExData} from './interfaces/exData.interface';
import {RestService} from '../../shared/services/rest.service';
import {ProgressService} from '../../shared/services/progress.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ii-external-data',
  templateUrl: './external-data.component.html',
  styleUrls: ['./external-data.component.css']
})
export class ExternalDataComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  offset = 0;
  limit = 10;
  phrase = null;
  category = null;
  totalRecords = null;
  dataSource = null;
  selection = null;
  filteredCategories = [];
  categoriesList = [];
  catCtrl: FormControl;
  displayedColumns = ['select', 'position', 'hhi', 'name', 'type', 'class', 'category', 'market_share', 'province'];

  constructor(private restService: RestService, private progressService: ProgressService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.catCtrl = new FormControl();
    this.catCtrl.valueChanges.subscribe(
      (data) => {
        if (data.trim().length === 0) {
          this.category = null;
          this.getData();
        }

        this.filterCategories(data.trim());
      }
    );

    this.dataSource = new MatTableDataSource<ExData>();
    this.selection = new SelectionModel<ExData>(true, []);

    this.getData();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.progressService.enable();
    this.restService.post('exData/get/' + this.offset + '/' + this.limit, {
      phrase: this.phrase ? this.phrase.trim() : null,
      category: this.category ? this.category.trim() : null,
    })
      .subscribe(
        (data) => {
          this.dataSource.data = data;
          this.totalRecords = data.length > 0 ? data[0].total : null;
          this.progressService.disable();
        },
        (err) => {
          console.error('Cannot get data. Error: ', err);
          this.progressService.disable();
        }
      );
  }

  getCategories() {
    this.restService.get('exdata/cat').subscribe(
      (data) => {
        this.categoriesList = data.map(el => el.category);
      },
      (err) => {
        console.error('Cannot get categories. Error: ', err);
      }
    );
  }

  filterCategories(cat) {
    this.filteredCategories = cat ? this.categoriesList.filter(el => new RegExp(cat, 'gi').test(el)) : this.categoriesList.slice();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  changePageSetting(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;

    this.getData();
  }

  applyFilter(phrase) {
    this.phrase = phrase;
    this.getData();
  }

  setCategory(cat) {
    this.category = cat.option.value;
    this.getData();
  }
}
