import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {RouterLink, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        RouterLink,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
  declarations: [LoginComponent],
  providers: [],
  exports: [LoginComponent]
})
export class LoginComponentModule {
}
