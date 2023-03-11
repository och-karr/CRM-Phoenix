import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import {RouterOutlet} from "@angular/router";

@NgModule({
    imports: [
        RouterOutlet
    ],
  declarations: [AuthComponent],
  providers: [],
  exports: [AuthComponent]
})
export class AuthComponentModule {
}
