import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule} from "@angular/material";

import {adminRouting} from './admin.routing';
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./auth.guard";

import {AdminHomeComponent} from "./home/home.component";
import {AdminFilterTabComponent} from "./home/filter-tab/filter-tab.component";

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminFilterTabComponent,
  ],
  imports: [
    adminRouting,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
