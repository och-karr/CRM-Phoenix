import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginComponentModule } from './components/login/login.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'auth/login', component: LoginComponent }]), LoginComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
