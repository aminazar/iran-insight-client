import {Routes, RouterModule} from '@angular/router';
import {TagComponent} from './tag.component';


const TAG_ROUTES: Routes = [
  {path: '', component: TagComponent, pathMatch: 'full'},
];

export const TagRouting = RouterModule.forChild(TAG_ROUTES);
