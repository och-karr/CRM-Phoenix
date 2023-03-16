import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {VerifyGuard} from "./guards/verify/verify.guard";
import {STORAGE} from "./services/storage";
import {AccessTokenService} from "./services/context/access-token.service";
import {AuthInterceptor} from "./auth.interceptor";
import {HasBioGuard} from "./guards/has-bio/has-bio.guard";
import {LeadsService} from "./services/leads.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: STORAGE, useValue: localStorage },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService,
    VerifyGuard,
    HasBioGuard,
    AccessTokenService,
    LeadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
