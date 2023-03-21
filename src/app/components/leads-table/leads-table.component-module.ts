import { NgModule } from '@angular/core';
import { LeadsTableComponent } from './leads-table.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
      RouterLink,
      RouterModule,
      CommonModule,
      ReactiveFormsModule
    ],
  declarations: [LeadsTableComponent],
  providers: [],
  exports: [LeadsTableComponent]
})
export class LeadsTableComponentModule {
}
