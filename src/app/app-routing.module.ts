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
import {CreateLeadComponentModule} from "./components/create-lead/create-lead.component-module";
import {LeadsNavComponent} from "./components/leads-nav/leads-nav.component";
import {LeadsNavComponentModule} from "./components/leads-nav/leads-nav.component-module";
import {IsAdminGuard} from "./guards/is-admin/is-admin.guard";
import {LoggedInGuard} from "./guards/logged-in/logged-in.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'auth',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
          canActivate: [LoggedInGuard],
          data: {loggedUrl: '/leads'},
          loadChildren: () => LoginComponentModule
        },
        {
          path: 'register',
          component: RegisterComponent,
          loadChildren: () => RegisterComponentModule
        }
      ]
    },
    // {
    //   path: '**',
    //   redirectTo: '/auth/login',
    //   pathMatch: 'full'
    // },
    {
      path: 'complete-profile',
      component: CompleteProfileComponent,
    },
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
      children: [
        {
          path: '',
          redirectTo: '/auth/login',
          pathMatch: 'full'
        },
        {
          path: 'create-lead',
          component: CreateLeadComponent,
          canActivate: [IsAdminGuard, VerifyGuard, HasBioGuard],
          data: {verifyUrl: '/verify', loginUrl: '/auth/login', hasBioUrl: '/complete-profile'},
          loadChildren: () => CreateLeadComponentModule
        },
        {
          path: 'leads',
          component: LeadsTableComponent,
          canActivate: [VerifyGuard, HasBioGuard],
          data: {verifyUrl: '/verify', loginUrl: '/auth/login', hasBioUrl: '/complete-profile'},
          loadChildren: () => LeadsTableComponentModule
        }
      ]
    }
  ]), AuthComponentModule, VerifyComponentModule, CompleteProfileComponentModule, LogoutComponentModule, LeadsNavComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
