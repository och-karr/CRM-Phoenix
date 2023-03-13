import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
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
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent]
})
export class RegisterComponentModule {
}
