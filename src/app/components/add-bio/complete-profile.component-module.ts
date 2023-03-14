import { NgModule } from '@angular/core';
import { CompleteProfileComponent } from './complete-profile.component';
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
  declarations: [CompleteProfileComponent],
  providers: [],
  exports: [CompleteProfileComponent]
})
export class CompleteProfileComponentModule {
}
