import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {AbstractSearchComponent} from '../../shared/components/abstract-search/abstract-search.component';

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

  getBestName(person) {

    if (person.display_name_en)
      return person.display_name_en;

    if (person.display_name_fa)
      return person.display_name_fa;

    return '';
  }
}
