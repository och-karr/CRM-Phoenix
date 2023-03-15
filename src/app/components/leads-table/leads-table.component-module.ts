import { NgModule } from '@angular/core';
import { LeadsTableComponent } from './leads-table.component';
import {RouterLink, RouterModule} from "@angular/router";

@NgModule({
  imports: [
    RouterLink,
    RouterModule,
  ],
  declarations: [LeadsTableComponent],
  providers: [],
  exports: [LeadsTableComponent]
})
export class LeadsTableComponentModule {
}
