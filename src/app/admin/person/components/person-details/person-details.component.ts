import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/services/breadcrumb.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'ii-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  @Input() personId: number = null;
  @Output() changedPerson = new EventEmitter<any>();

  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
              private router: Router, public dialogRef: MatDialogRef<PersonDetailsComponent>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.personId = +params['id'] ? +params['id'] : null;
        if(this.personId)
          this.breadcrumbService.pushChild('Update Person', this.router.url, false);
        else
          this.breadcrumbService.pushChild('Add Person', this.router.url, false);
      },
      (err) => console.error('Cannot parse params. Error: ', err)
    );
  }

  applyChanges(data){
    this.changedPerson.emit(data);
  }
}
