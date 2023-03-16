import { NgModule } from '@angular/core';
import { LeadsTableComponent } from './leads-table.component';
import {RouterLink, RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
      RouterLink,
      RouterModule,
      MatTableModule,
      CommonModule
    ],
  declarations: [LeadsTableComponent],
  providers: [],
  exports: [LeadsTableComponent]
})
export class LeadsTableComponentModule {
}
