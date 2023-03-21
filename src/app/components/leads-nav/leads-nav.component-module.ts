import { NgModule } from '@angular/core';
import { LeadsNavComponent } from './leads-nav.component';
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";

@NgModule({
    imports: [
      RouterOutlet,
      RouterLink,
      RouterModule,
    ],
  declarations: [LeadsNavComponent],
  providers: [],
  exports: [LeadsNavComponent]
})
export class LeadsNavComponentModule {
}
