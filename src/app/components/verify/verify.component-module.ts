import { NgModule } from '@angular/core';
import { VerifyComponent } from './verify.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterLink,
    RouterModule,
    CommonModule
  ],
  declarations: [VerifyComponent],
  providers: [],
  exports: [VerifyComponent]
})
export class VerifyComponentModule {
}
