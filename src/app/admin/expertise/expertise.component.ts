import { Component, OnInit } from '@angular/core';
// import {ProgressService} from "../../shared/services/progress.service";
// import {SearchService} from "../../shared/services/search.service";
// import {MatSnackBar} from "@angular/material";
// import {Router} from "@angular/router";
// import {BreadcrumbService} from "../../shared/services/breadcrumb.service";
import {AbstractSearchComponent} from '../../shared/components/abstract-search/abstract-search.component';

@Component({
  selector: 'ii-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent extends AbstractSearchComponent implements OnInit {

  ngOnInit() {
    this.key = 'expertise';
    this.viewName = 'Expertise';
    super.ngOnInit();
  }

  openForm(id: number = null): void {
    this.cardId = id;
    this.router.navigate([`/admin/expertise/form/${id}`]);
  }

  openView(id: number = null): void {
    this.cardId = id;
    this.router.navigate(['/admin/expertise/' + id]);
  }

  deleteExpertise(id: number = null): void {
    super.deleteCard(id).subscribe(
      (res) => {
        if (res) {
          this.progressService.enable();
          this.restService.delete(`/expertise/${id}`).subscribe(
            (data) => {
              this.cardId = null;
              this.snackBar.open('Expertise is deleted successfully', null, {
                duration: 2300,
              });
              this.searching();
              this.progressService.disable();
            },
            (err) => {
              console.error('Cannot delete this expertise. Error: ', err);
              this.snackBar.open('Cannot delete this expertise. Please try again.', null, {
                duration: 3200,
              });
              this.progressService.disable();
            }
          );
        }
      },
      (err) => console.error('Error in closing component. Error: ', err)
    );
  }
}
