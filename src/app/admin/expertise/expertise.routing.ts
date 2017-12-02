import {RouterModule, Routes} from "@angular/router";
import {ExpertiseComponent} from "./expertise.component";
import {ExpertiseFormComponent} from "./expertise-form/expertise-form.component";

const Expertise_ROUTES: Routes = [
  {path: '', component: ExpertiseComponent, pathMatch: 'full'},
  {path: ':id', component: ExpertiseFormComponent},
];

export const expertiseRouting = RouterModule.forChild(Expertise_ROUTES);
