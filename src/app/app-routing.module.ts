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
import {CompleteProfileComponent} from "./components/add-bio/complete-profile.component";
import {CompleteProfileComponentModule} from "./components/add-bio/complete-profile.component-module";
import {HasBioGuard} from "./guards/has-bio/has-bio.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'auth',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
          // canActivate: [VerifyGuard],
          data: {redirectUrl: '/verify', isLogin: true},
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
      path: 'complete-profile',
      component: CompleteProfileComponent,
      canActivate: [VerifyGuard, HasBioGuard],
      data: {redirectUrl: '/verify', isLogin: false, loginUrl: '/login', hasBioUrl: '/auth/register'},
    },
    {
      path: 'verify',
      component: VerifyComponent
    }
  ]), AuthComponentModule, CompleteProfileComponentModule, VerifyComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
