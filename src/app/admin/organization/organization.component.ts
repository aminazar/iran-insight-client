import {Component, OnInit} from '@angular/core';
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

  endOrganization(org) {
    super.endCard(org.oid).subscribe(
      (res) => {
        if (res) {
          this.progressService.enable();
          this.restService.post('organization/one/delete/' + org.oid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            (data) => {
              this.cardId = null;
              this.snackBar.open('Organization is ended successfully', null, {
                duration: 2300,
              });
              org.end_date = moment().format('YYYY-MM-DD');
              this.progressService.disable();
            },
            (err) => {
              console.error('Cannot end this organization. Error: ', err);
              this.snackBar.open('Cannot end this organization. Please try again.', null, {
                duration: 3200,
              });
              this.progressService.disable();
            }
          );
        }
      }
    );
  }

  deleteOrganization(id: number = null): void {
    super.deleteCard(id).subscribe(
      (res) => {
        if (res) {
          this.progressService.enable();
          this.restService.delete('organization/' + id).subscribe(
            (data) => {
              this.cardId = null;
              this.snackBar.open('Organization is deleted successfully', null, {
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
        }
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

  orgIsEnd(org) {
    return (org && org.end_date && org.end_date >= org.start_date && moment(org.end_date) <= moment());
  }

}
