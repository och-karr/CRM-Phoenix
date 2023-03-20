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
import {CompleteProfileComponent} from "./components/add-bio/complete-profile.component";
import {CompleteProfileComponentModule} from "./components/add-bio/complete-profile.component-module";
import {HasBioGuard} from "./guards/has-bio/has-bio.guard";
import {LeadsTableComponentModule} from "./components/leads-table/leads-table.component-module";
import {LeadsTableComponent} from "./components/leads-table/leads-table.component";
import {VerifyGuard} from "./guards/verify/verify.guard";
import {LogoutComponent} from "./components/logout/logout.component";
import {LogoutComponentModule} from "./components/logout/logout.component-module";
import {CreateLeadComponent} from "./components/create-lead/create-lead.component";
import {LeadsNavComponent} from "./components/leads-nav/leads-nav.component";
import {LeadsNavComponentModule} from "./components/leads-nav/leads-nav.component-module";

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
          // data: {redirectUrl: '/verify', isLogin: true},
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
      canActivate: [ HasBioGuard],
      data: {redirectUrl: '/verify', isLogin: false, loginUrl: '/auth/login', hasBioUrl: '/auth/register'},
    },
    {
      path: 'leads',
      component: LeadsTableComponent,
      canActivate: [VerifyGuard],
      data: {redirectUrl: '/verify', isLogin: false, loginUrl: '/auth/login'},
    },
    // {
    //   path: 'create-lead',
    //   component: CreateLeadComponent
    // },
    {
      path: 'verify',
      component: VerifyComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    {
      path: '',
      component: LeadsNavComponent,
      // loadChildren: () => CreateLeadComponentModule,
      children: [
        {
          path: 'create-lead',
          component: CreateLeadComponent,

        },
        // {
        //   path: 'leads',
        //   component: LeadsTableComponent,
        //   loadChildren: () => LeadsTableComponentModule
        // },
      ]
    }
  ]), AuthComponentModule, VerifyComponentModule, CompleteProfileComponentModule, LogoutComponentModule, LeadsNavComponentModule, LeadsTableComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
