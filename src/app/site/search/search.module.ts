import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from '@angular/forms';

import {SearchRouting} from './search.routing';
import {SearchFieldsComponent} from './search-fields/search-fields.component';
import {SearchMainComponent} from './search-main/search-main.component';
import {SearchResultComponent} from './search-result/search-result.component';

@NgModule({
  declarations: [
    SearchFieldsComponent,
    SearchMainComponent,
    SearchResultComponent,
  ],
  imports: [
    FlexLayoutModule,
    FormsModule,
    SearchRouting,
  ],
  exports: []
})
export class SearchModule {
}
