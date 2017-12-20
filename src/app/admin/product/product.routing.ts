import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {LeavingGuard} from '../leavingGuard';
import {ProductViewComponent} from './components/product-view/product-view.component';
import {ProductFormComponent} from './components/product-form/product-form.component';

const Product_ROUTES: Routes = [
  {path: '', component: ProductComponent, pathMatch: 'full'},
  {path: ':id', component: ProductViewComponent},
  {path: 'form/:id', component: ProductFormComponent, canDeactivate: [LeavingGuard]},
];

export const productRouting = RouterModule.forChild(Product_ROUTES);
