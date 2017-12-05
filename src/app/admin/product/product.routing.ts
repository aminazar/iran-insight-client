import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductFormComponent} from './components/product-form/product-form.component';


const Product_ROUTES: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full'},
  { path: ':id', component: ProductFormComponent},
];

export const productRouting = RouterModule.forChild(Product_ROUTES);
