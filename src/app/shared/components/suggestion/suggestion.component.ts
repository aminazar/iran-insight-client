import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../../services/rest.service';
import {map} from 'rxjs/operator/map';
import {ProgressService} from '../../services/progress.service';

@Component({
  selector: 'ii-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  @Input() name = '';
  @Input() placeholder: string = null;
  @Input() idColumn = '';
  @Input() fieldNameEn = '';
  @Input() fieldNameFa = '';
  @Input() currentIds: number[] = [];
  @Input() descriptionFieldName = '';
  @Input() descriptionFieldNameFa = '';
  @Output() add = new EventEmitter<any>();

  suggestionCtrl: FormControl;
  filteredItems: any[] = [];
  fn = '';
  dscp_fn = '';

  constructor(private restService: RestService, private progressService: ProgressService) {
  }

  ngOnInit() {
    if (!this.placeholder)
      this.placeholder = this.name;

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

  addItem(data) {
    const item = this.filteredItems.filter(el => {
      const checkStr = (this.dscp_fn) ? (el[this.fn] + '-' + el[this.dscp_fn]).toLowerCase() : el[this.fn].toLowerCase();
      if (checkStr === data.option.value.toLowerCase())
        return el;
    })[0];
    this.add.emit(item);
    this.suggestionCtrl.setValue('');
  }

  filtering(phrase: string) {
    if ((!phrase || phrase === '') || phrase.length < 3)
      this.filteredItems = [];
    else {
      this.progressService.enable();

      if (phrase.charCodeAt(0) >= 48 && phrase.charCodeAt(0) <= 122) {
        this.fn = this.fieldNameEn;
        this.dscp_fn = this.descriptionFieldName ? this.descriptionFieldName : null;
      } else {
        this.fn = this.fieldNameFa;
        this.dscp_fn = this.descriptionFieldNameFa ? this.descriptionFieldNameFa : null;
      }

      this.restService.post('suggest', {
        table: this.name,
        phrase: phrase,
        idColumn: this.idColumn,
        fieldName: this.fn,
        otherFieldName: (this.fn === this.fieldNameEn) ? this.fieldNameFa : this.fieldNameEn,
        currentIds: this.currentIds,
        dscpFieldName: this.descriptionFieldName,
        dscpFieldNameFa: this.descriptionFieldNameFa,
      }).subscribe(
        (data) => {
          this.filteredItems = data;

          // if(data && data.length === 1 && data[0][this.fn].toLowerCase() === phrase.toLowerCase())
          //   this.addItem(data[0]);

          this.progressService.disable();
        },
        (err) => {
          this.filteredItems = [];
          this.progressService.disable();
        }
      );
    }
  }
}
