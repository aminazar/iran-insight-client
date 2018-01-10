import { Component, OnInit } from '@angular/core';
import {AbstractSearchComponent} from '../../shared/components/abstract-search/abstract-search.component';
import * as moment from 'moment';

@Component({
  selector: 'ii-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent extends AbstractSearchComponent implements OnInit {
  ngOnInit() {
    this.key = 'organization';
    this.viewName = 'Organization';
    super.ngOnInit();
  }

  deleteOrganization(id: number = null): void {
    super.deleteCard(id).subscribe(
      (res) => {
        this.progressService.enable();
        this.restService.post('organization/one/delete/' + id, {
          end_date: moment().format('YYYY-MM-DD'),
        }).subscribe(
          (data) => {
            this.cardId = null;
            this.snackBar.open('Organization is delete successfully', null, {
              duration: 2300,
            });
            this.searching();
            this.progressService.disable();
          },
          (err) => {
            console.error('Cannot delete this organization. Error: ', err);
            this.snackBar.open('Cannot delete this organization. Please try again.', null, {
              duration: 3200,
            });
            this.progressService.disable();
          }
        );
      },
      (err) => console.error('Error in closing component. Error: ', err)
    );
  }

  getBestName(organization) {
    if (organization.name)
      return organization.name;
    if (organization.name_fa)
      return organization.name_fa;
    return '';
  }

  orgIsDead(org) {
    return (org && org.end_date > org.start_date);
  }
}
