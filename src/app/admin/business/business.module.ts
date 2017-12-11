import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatDialogModule, MatIconModule, MatSnackBarModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule,
  MatAutocompleteModule, MatGridListModule, MatPaginatorModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule
} from '@angular/material';
import {businessRouting} from './business.routing';
import { BusinessMembersComponent } from './components/business-members/business-members.component';
import { BusinessInfoComponent } from './components/business-info/business-info.component';
import {ActiveDirective} from './directives/active/active.directive';

@NgModule({
  imports: [
    businessRouting,
    CommonModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  declarations: [BusinessComponent, BusinessMembersComponent, BusinessInfoComponent, ActiveDirective]
})
export class BusinessModule { }
