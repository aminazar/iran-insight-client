import {NgModule} from '@angular/core';
import {SiteRouting} from './site.routing';
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
import {AuthGuard} from './auth.guard';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    SiteRouting,
    MatInputModule
  ],
  exports: [],
  providers: [AuthGuard],
})
export class SiteModule {
}
