import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {ActionEnum} from '../../shared/enum/action.enum';
import {ProgressService} from '../../shared/services/progress.service';
import {PersonViewComponent} from './components/person-view/person-view.component';
import {AuthService} from '../../shared/services/auth.service';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {StorageService} from '../../shared/services/storage.service';
import {AbstractSearchComponent} from '../../shared/components/abstract-search.component';

@Component({
  selector: 'ii-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent extends AbstractSearchComponent implements OnInit {


  ngOnInit() {
    this.key = 'person';
    this.viewName = 'Person';
    super.ngOnInit();

  }

  deletePerson(id: number = null): void {

    super.deleteCard(id).subscribe((res) => {
        if (res)
          this.authService.deletePerson(id).subscribe(
            (data) => {
              this.cardId = null;
              this.snackBar.open('Person is deleted successfully', null, {
                duration: 2300
              });
              this.searching();
            },
            (err) => {
              console.error('Cannot delete this person. Error: ', err);
              this.snackBar.open('Cannot delete this person. Please try again.', null, {
                duration: 3200
              });
            }
          );
      },
      (err) => console.error('Error in closing component. Error: ', err)
    );

  }

}
