import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatDialog} from '@angular/material/dialog';
import {TypeFormComponent} from './components/type-form/type-form.component';
import {SearchService} from '../../shared/services/search.service';
import {IType} from './interfaces/type.interface';

@Component({
  selector: 'ii-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit, OnDestroy {


  types: IType[] = [];

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private dialog: MatDialog, private searchService: SearchService) {
  }


  ngOnInit() {
    this.breadCrumbService.pushChild('Type', this.router.url, true);
  }

  openForm(type_name: string = '', id: number = NaN): void {
    const dialogRef = this.dialog.open(TypeFormComponent, {
      width: '600px',
      data: {type_name, id}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const type: IType[] = this.types.filter(t => t.type_name === result.type_name && t.id === parseInt(result.id));
        if (type.length === 1) { // update type card

          type[0].name = result.name;
          type[0].name_fa = result.name_fa;
          type[0].active = result.active;

        } else if (type.length === 0) { // insert new card
          this.types.push(result);
        }
      }

    });
  }

  search(searchBundle: any = null) {

    this.searchService.search(searchBundle, 0).subscribe(res => {

      this.types = [];
      res.type.forEach(type => {
        this.types.push(<IType>{
          id: type.id,
          name: type.name,
          name_fa: type.name_fa,
          type_name: type.table_name,
          active: type.active

        });
      });

    });
  }

  ngOnDestroy(): void {
  }

}
