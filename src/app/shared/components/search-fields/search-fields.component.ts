import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TargetEnum} from '../../enum/target.enum';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';

enum ElementEnum {
  isMentor,
  isEducation,
  isLead,
  isActive,
};

@Component({
  selector: 'ii-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit, OnDestroy {
  @Input() target = null;
  @Output() searching = new EventEmitter<any>();
  targets = [];
  targetList = [];
  targetEnum = TargetEnum;
  elementEnum = ElementEnum;
  searchCtrl = new FormControl();
  amountCtrl = new FormControl();

  //View variables
  phrase = null;
  amount = null;
  isEducation = null;
  isLead = null;
  isMentor = null;
  isActive = null;
  comparison = {
    lt: false,
    gt: false,
    eq: false,
  };
  startDate = null;
  endDate = null;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.targetList = [];
    Object.keys(this.targetEnum).forEach(el => {
      if (el.charCodeAt(0) < 48 || el.charCodeAt(0) > 57)
        this.targetList.push(el);
    });
    this.targetList.sort();

    if (this.target) {
      this.targetList = this.targetList.filter(el => el.toLowerCase() !== this.target.toLowerCase());
      this.targets.push(this.target);
      this.searchOnData(null);
    }

    this.searchCtrl.valueChanges.debounceTime(500).subscribe(
      (data) => {
        this.phrase = data.trim() !== '' ? data.trim() : null;
        this.searchOnData();
      },
      (err) => {
        console.log(err);
      }
    );

    this.amountCtrl.valueChanges.debounceTime(500).subscribe(
      (data) => {
        this.amount = data;
        this.searchOnData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.targetList = null;
    this.target = null;
    this.targets = null;
    this.phrase = null;
    this.amount = null;
    this.isEducation = null;
    this.isLead = null;
    this.isMentor = null;
    this.isActive = null;
    this.comparison = null;
    this.startDate = null;
    this.endDate = null;
  }

  addTarget(target_index) {
    let target_title = this.targetList[target_index];
    this.targets.push(target_title);
    this.targetList = this.targetList.filter(el => el.toLowerCase() !== target_title.toLowerCase());
  }

  removeTarget(trg) {
    this.targets = this.targets.filter(el => el.toLowerCase() !== trg.toLowerCase());
    this.targetList.push(trg);
    this.targetList.sort();
  }

  searchOnData(phrase?) {
    if (!phrase)
      phrase = this.phrase;

    // if ((phrase === null || phrase === undefined || phrase === '') && (this.target === null || this.target === undefined))
    //   return;

    if (!this.checkValidation())
      return;

    let trg = {};
    this.targets.forEach(el => {
      trg[el] = true;
    });

    let searchData = {
      phrase: phrase,
      options: {
        target: trg,
        start_date: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null,
        end_date: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : null,
        is_mentor: this.isMentor,
        is_lead: this.isLead,
        is_education: this.isEducation,
        is_active: this.isActive,
        comparison_type: {
          lt: this.comparison.lt,
          gt: this.comparison.gt,
          eq: this.comparison.eq,
        },
        amount: this.amount,
        show_all: (this.target
          && (phrase === null || phrase === '')
          && this.isMentor === null
          && this.isEducation === null
          && this.isLead === null
          && this.isActive === null
          && this.amount === null
          && !this.comparison.lt && !this.comparison.gt && !this.comparison.eq
          && !this.startDate && !this.endDate),
      }
    };

    this.searching.emit(searchData);
  }

  checkValidation() {
    if (!this.amount && (this.comparison.lt || this.comparison.gt || this.comparison.eq)) {
      this.snackBar.open('Comparison fields are not valid when no amount value is declared', null, {
        duration: 2500,
      });
      return false;
    }

    if ((this.startDate && this.endDate) && this.startDate > this.endDate) {
      this.snackBar.open('Start date must be before end date', null, {
        duration: 2000,
      });
      return false;
    }

    return true;
  }

  changeState(element) {
    switch (element) {
      case this.elementEnum.isEducation: {
        if (this.isEducation === null)
          this.isEducation = true;
        else if (this.isEducation === true)
          this.isEducation = false;
        else if (this.isEducation === false)
          this.isEducation = null;
      }
        ;
        break;
      case this.elementEnum.isLead: {
        if (this.isLead === null)
          this.isLead = true;
        else if (this.isLead === true)
          this.isLead = false;
        else if (this.isLead === false)
          this.isLead = null;
      }
        ;
        break;
      case this.elementEnum.isMentor: {
        if (this.isMentor === null)
          this.isMentor = true;
        else if (this.isMentor === true)
          this.isMentor = false;
        else if (this.isMentor === false)
          this.isMentor = null;
      }
        ;
        break;
      case this.elementEnum.isActive: {
        if (this.isActive === null)
          this.isActive = true;
        else if (this.isActive === true)
          this.isActive = false;
        else if (this.isActive === false)
          this.isActive = null;
      }
        ;
        break;
    }

    this.searchOnData();
  }
}
