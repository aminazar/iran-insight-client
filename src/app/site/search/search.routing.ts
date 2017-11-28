import {Routes, RouterModule} from '@angular/router';
import {SearchMainComponent} from './search-main/search-main.component';

const Search_ROUTES: Routes = [
  {path: '', component: SearchMainComponent}
];

export const SearchRouting = RouterModule.forChild(Search_ROUTES);
