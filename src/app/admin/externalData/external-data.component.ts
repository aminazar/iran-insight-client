import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ExData} from './interfaces/exData.interface';
import {RestService} from '../../shared/services/rest.service';
import {ProgressService} from '../../shared/services/progress.service';
import {SelectionModel} from '@angular/cdk/collections';

const ELData: ExData[] = [
  {position: 1, name: 'a', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 2, name: 'b', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 3, name: 'c', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 4, name: 'd', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 5, name: 'e', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 6, name: 'f', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 7, name: 'g', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 8, name: 'h', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 9, name: 'i', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 10, name: 'j', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 11, name: 'k', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 12, name: 'l', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 13, name: 'm', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 14, name: 'n', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 15, name: 'o', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 16, name: 'p', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
  {position: 17, name: 'q', type: 'asd', category: 'cat1', market_share: 12.3, province: 'Tehran'},
];

@Component({
  selector: 'ii-external-data',
  templateUrl: './external-data.component.html',
  styleUrls: ['./external-data.component.css']
})
export class ExternalDataComponent implements OnInit {
  offset = 0;
  limit = 10;
  phrase = null;
  totalRecords = null;
  dataSource = null;
  selection = null;
  displayedColumns = ['select', 'position', 'name', 'type', 'category', 'market_share', 'province'];

  constructor(private restService: RestService, private progressService: ProgressService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ExData>();
    this.selection = new SelectionModel<ExData>(true, []);

    this.getData();
  }

  getData() {
    // this.progressService.enable();
    // this.restService.post('exData/get' + this.offset + '/' + this.limit, {
    //   phrase: this.phrase ? this.phrase.trim() : null,
    // })
    //   .subscribe(
    //     (data) => {
    //       console.log('Data: ', data);
    //       this.dataSource = data;
    //       this.progressService.disable();
    //     },
    //     (err) => {
    //       console.error('Cannot get data. Error: ', err);
    //       this.progressService.disable();
    //     }
    //   );

    this.dataSource.data = ELData;
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
    if (phrase.trim().length > 2) {
      this.phrase = phrase;
      this.getData();
    }
  }
}
