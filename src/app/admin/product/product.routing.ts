import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductInfoCardComponent} from './components/product-info-card/product-info-card.component';


const Product_ROUTES: Routes = [
  {path: '', component: ProductComponent, pathMatch: 'full'},
  {path: 'add/:id', component: ProductFormComponent},
  {path: 'update/:id', component: ProductFormComponent},
  {path: 'view-info/:id', component: ProductInfoCardComponent},
];

export const productRouting = RouterModule.forChild(Product_ROUTES);
