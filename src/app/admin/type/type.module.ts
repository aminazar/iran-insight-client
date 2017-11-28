import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeComponent} from './type.component';
import {typeRouting} from './type.routing';
import {TypeFormComponent} from './type-form/type-form.component';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    typeRouting,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [TypeComponent, TypeFormComponent]
})
export class TypeModule {
}
