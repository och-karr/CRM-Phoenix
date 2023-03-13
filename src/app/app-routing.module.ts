import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LoginComponentModule} from './components/login/login.component-module';
import {AuthComponent} from "./components/auth/auth.component";
import {AuthComponentModule} from "./components/auth/auth.component-module";
import {RegisterComponent} from "./components/register/register.component";
import {RegisterComponentModule} from "./components/register/register.component-module";
import {VerifyComponent} from "./components/verify/verify.component";
import {VerifyComponentModule} from "./components/verify/verify.component-module";
import {VerifyGuard} from "./guards/verify/verify.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'auth',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
          canActivate: [VerifyGuard],
          data: {redirectUrl: '/verify'},
          loadChildren: () => LoginComponentModule
        },
        {
          path: 'register',
          component: RegisterComponent,
          loadChildren: () => RegisterComponentModule
        }
      ]
    },
    {
      path: 'verify',
      component: VerifyComponent
    }
  ]), AuthComponentModule, VerifyComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
