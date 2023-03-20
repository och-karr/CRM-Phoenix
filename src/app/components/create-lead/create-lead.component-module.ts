import { NgModule } from '@angular/core';
import { CreateLeadComponent } from './create-lead.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    RouterLink,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'create-lead',
        component: CreateLeadComponent
      },
    ]),
  ],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent]
})
export class CreateLeadComponentModule {
}
