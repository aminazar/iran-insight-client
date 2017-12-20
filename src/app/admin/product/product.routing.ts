import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {LeavingGuard} from '../leavingGuard';

const Product_ROUTES: Routes = [
  {path: '', component: ProductComponent, pathMatch: 'full'},
];

export const productRouting = RouterModule.forChild(Product_ROUTES);
