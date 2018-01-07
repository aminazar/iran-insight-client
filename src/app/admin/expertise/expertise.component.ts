import { Component, OnInit } from '@angular/core';
// import {ProgressService} from "../../shared/services/progress.service";
// import {SearchService} from "../../shared/services/search.service";
// import {MatSnackBar} from "@angular/material";
// import {Router} from "@angular/router";
// import {BreadcrumbService} from "../../shared/services/breadcrumb.service";
import {AbstractSearchComponent} from "../../shared/components/abstract-search/abstract-search.component";

@Component({
  selector: 'ii-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
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
    //TODO: delete
  }
}
