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

  deleteType(id: number = null, tableName): void {
    super.deleteCard(id, tableName + ' type').subscribe(
      (res) => {
        if (res)
          this.restService.delete('type/' + tableName + '/' + id).subscribe(
            (data) => {
              this.cardId = null;
              this.snackBar.open('This type is deleted successfully', null, {
                duration: 2300,
              });
              this.searching();
            },
            (err) => {
              console.error('Cannot delete this type. Error: ', err);
            }
          );
      },
      (err) => {
      }
    );
  }

  openForm(state: string, tableName, id: number = null) {
    super.open(state, id, false);

    this.router.navigate([state + '/' + (tableName ? tableName : null) + '/' + id], {relativeTo: this.activatedRoute});
  }
}
