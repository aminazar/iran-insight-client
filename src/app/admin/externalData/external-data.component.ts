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
  checkedList = [];

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
          const tempData = [];
          this.selection.clear();
          let counter = this.offset;
          data.forEach(el => {
            tempData.push(Object.assign({position: ++counter}, el));
          });
          this.dataSource.data = tempData;

          this.dataSource.data.forEach(el => {
            if (this.checkedList.findIndex(i => i.eid === el.eid) !== -1)
              this.selection.select(el);
          });

          this.totalRecords = data.length > 0 ? data[0].total : 0;
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
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach(row => this.removeFromChecked(row));
    } else {
      this.dataSource.data.forEach(row => {
        this.saveAsChecked(row);
        this.selection.select(row);
      });
    }
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

  selectRow(data, row) {
    if (data) {
      this.selection.toggle(row);

      if (data.checked)
        this.saveAsChecked(row);
      else
        this.removeFromChecked(row);
    }
  }

  saveAsChecked(row) {
    if (this.checkedList.findIndex(el => el.eid === row.eid) === -1)
      this.checkedList.push(row);
  }

  removeFromChecked(row) {
    this.checkedList = this.checkedList.filter(el => el.eid !== row.eid);
  }

  insertData() {
    if (this.checkedList.length <= 0)
      return;

    this.progressService.enable();
    this.restService.put('exdata/batch', this.checkedList).subscribe(
      (data) => {
        this.snackBar.open(this.checkedList.length + ' new item' + (this.checkedList.length > 1 ? 's are' : ' is') + ' added', null, {
          duration: 2300,
        });
        this.checkedList = [];
        this.progressService.disable();
        this.getData();
      },
      (err) => {
        this.progressService.disable();
      }
    );
  }
}
