import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeComponent} from './type.component';
import {typeRouting} from './type.routing';
import {TypeFormComponent} from './components/type-form/type-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatOptionModule,
  MatSelectModule, MatSnackBarModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ActiveDirective } from './directives/active/active.directive';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    SharedModule
  ],
  declarations: [TypeComponent, TypeFormComponent, ActiveDirective],
  entryComponents: [TypeFormComponent]
})
export class TypeModule {
}
