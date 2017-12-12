import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {RestService} from "../../services/rest.service";
import {map} from "rxjs/operator/map";
import {ProgressService} from "../../services/progress.service";

@Component({
  selector: 'ii-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  @Input() name: string = '';
  @Input() id: number = null;
  @Input() idColumn: string = '';
  @Input() fieldNameEn: string = '';
  @Input() fieldNameFa: string = '';
  @Input() currentIds: number[] = [];
  @Output() add = new EventEmitter<any>();

  suggestionCtrl: FormControl;
  filteredItems: any[] = [];
  fn: string = '';

  constructor(private restService: RestService, private progressService: ProgressService) {
  }

  ngOnInit() {
    this.suggestionCtrl = new FormControl();
    this.suggestionCtrl.valueChanges.debounceTime(300).subscribe(
      (data) => {
        this.filtering(data);
      },
      (err) => {
        this.filteredItems = [];
      }
    );
  }

  addItem(item) {
    this.add.emit(item);
    this.suggestionCtrl.setValue('');
  }

  filtering(phrase: string) {
    if ((!phrase || phrase === '') || phrase.length < 3 || !this.id)
      this.filteredItems = [];
    else{
      this.progressService.enable();

      if (phrase.charCodeAt(0) >= 48 && phrase.charCodeAt(0) <= 122)
        this.fn = this.fieldNameEn;
      else
        this.fn = this.fieldNameFa;

      this.restService.post('suggest', {
        table: this.name,
        id: this.id,
        phrase: phrase,
        idColumn: this.idColumn,
        fieldName: this.fn,
        currentIds: this.currentIds,
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
}
