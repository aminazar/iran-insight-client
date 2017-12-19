import {RouterModule, Routes} from "@angular/router";
import {EventComponent} from "./event.component";
import {EventFormComponent} from "./components/event-form/event-form.component";
import {EventViewComponent} from "./components/event-view/event-view.component";

const Event_ROUTES: Routes = [
  {path: '', component: EventComponent, pathMatch: 'full'},
  {path: ':id', component: EventViewComponent},
  {path: 'form/:id', component: EventFormComponent},
];

export const eventRouting = RouterModule.forChild(Event_ROUTES);
