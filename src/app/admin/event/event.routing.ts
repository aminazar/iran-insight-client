import {RouterModule, Routes} from "@angular/router";
import {EventComponent} from "./event.component";

const Event_ROUTES: Routes = [
  {path: '', component: EventComponent, pathMatch: 'full'},
];

export const eventRouting = RouterModule.forChild(Event_ROUTES);
