import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LCEComponent } from './lce.component';
import {LCERouting} from './lce.routing';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatOptionModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import { LceFormComponent } from './components/lce-form/lce-form.component';
import { LceViewComponent } from './components/lce-view/lce-view.component';

@NgModule({
  imports: [
    CommonModule,
    LCERouting,
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
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatPaginatorModule
  ],
  declarations: [LCEComponent, LceFormComponent, LceViewComponent],
  entryComponents: [LceFormComponent]
})
export class LCEModule { }
