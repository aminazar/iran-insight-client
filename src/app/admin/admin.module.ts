import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSidenavModule,
  MatTabsModule
} from '@angular/material';

import {AdminRouting} from './admin.routing';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './auth.guard';
import {AdminHomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
  ],
  imports: [
    AdminRouting,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
  ],
  providers: [AuthGuard],
  exports: []
})
export class AdminModule {
}
