import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatDialogModule, MatIconModule, MatSnackBarModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule,
  MatAutocompleteModule, MatGridListModule, MatPaginatorModule, MatTabsModule, MatCardModule, MatInputModule,
  MatButtonModule, MatStepperModule, MatExpansionModule, MatAccordion
} from '@angular/material';
import {businessRouting} from './business.routing';
import { BusinessMembersComponent } from './components/business-members/business-members.component';
import { BusinessInfoComponent } from './components/business-info/business-info.component';
import {ActiveDirective} from './directives/active/active.directive';
import { BusinessViewComponent } from './components/business-view/business-view.component';
import {AgmCoreModule} from '@agm/core';
import { BusinessProductsComponent } from './components/business-products/business-products.component';
import { BizMemberFormComponent } from './components/biz-member-form/biz-member-form.component';
import { BizMemberViewComponent } from './components/biz-member-view/biz-member-view.component';

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
    MatStepperModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtglbLDTFZFa1rE-glHm7bFxnp9iANHro'
    }),
  ],
  declarations: [BusinessComponent, BusinessMembersComponent, BusinessInfoComponent, ActiveDirective, BusinessProductsComponent, BusinessViewComponent, BizMemberFormComponent, BizMemberViewComponent],
  providers: [{ provide: 'Window', useValue: window }]
})
export class BusinessModule { }
