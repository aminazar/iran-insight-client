import {NgModule} from '@angular/core';
import {SiteRouting} from './site.routing';
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    SiteRouting,
    MatInputModule
  ],
  exports: []
})
export class SiteModule {
}
