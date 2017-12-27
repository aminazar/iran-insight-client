import {Component, OnInit} from '@angular/core';
import {AbstractSearchComponent} from '../../shared/components/abstract-search/abstract-search.component';

@Component({
  selector: 'ii-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent extends AbstractSearchComponent implements OnInit {


  ngOnInit() {
    this.key = 'type';
    this.viewName = 'Types';
    super.ngOnInit();

  }

  deleteType(id: number = null): void {

    super.deleteCard(id).subscribe((res) => {
        // if (res)
          // this.authService.deletePerson(id).subscribe(
          //   (data) => {
          //     this.cardId = null;
          //     this.snackBar.open('Person is deleted successfully', null, {
          //       duration: 2300
          //     });
          //     this.searching();
          //   },
          //   (err) => {
          //     console.error('Cannot delete this person. Error: ', err);
          //     this.snackBar.open('Cannot delete this person. Please try again.', null, {
          //       duration: 3200
          //     });
          //   }
          // );
      },
      (err) => {}
    );
  }

}
