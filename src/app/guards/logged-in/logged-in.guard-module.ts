import { NgModule } from '@angular/core';
import { LoggedInGuard } from './logged-in.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [LoggedInGuard],
  exports: []
})
export class LoggedInGuardModule {
}
