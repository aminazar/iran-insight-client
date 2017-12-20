import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {productRouting} from './product.routing';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule, MatTabsModule
} from '@angular/material';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductInfoCardComponent } from './components/product-info-card/product-info-card.component';


@NgModule({
  imports: [
    CommonModule,
    productRouting,
    SharedModule,
    FormsModule,
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
  declarations: [ProductComponent, ProductFormComponent, ProductInfoCardComponent]
})
export class ProductModule { }
