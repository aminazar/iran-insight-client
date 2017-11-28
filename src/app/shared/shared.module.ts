import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header.component';
import {RouterModule} from '@angular/router';

import {RestService} from "./services/rest.service";
import {SearchService} from "./services/search.service";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    RouterModule
  ],
  providers: [RestService, SearchService],
  exports: [HeaderComponent]
})
export class SharedModule {
}
