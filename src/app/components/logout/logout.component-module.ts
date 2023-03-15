import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterLink,
    RouterModule,
    CommonModule
  ],
  declarations: [LogoutComponent],
  providers: [],
  exports: [LogoutComponent]
})
export class LogoutComponentModule {
}
