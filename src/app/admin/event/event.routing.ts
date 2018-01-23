import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event.component';
import {EventFormComponent} from './components/event-form/event-form.component';
import {EventViewComponent} from './components/event-view/event-view.component';
import {LeavingGuard} from '../leavingGuard';

const Event_ROUTES: Routes = [
  {path: '', component: EventComponent, pathMatch: 'full'},
  {path: ':id', component: EventComponent},
  {path: 'view/:id', component: EventViewComponent},
  {path: 'form/:id', component: EventFormComponent, canDeactivate: [LeavingGuard]},
];

export const eventRouting = RouterModule.forChild(Event_ROUTES);
