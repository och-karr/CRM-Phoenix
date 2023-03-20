import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {LeadsService} from "../../services/leads.service";

@Component({
  selector: 'app-leads-nav',
  templateUrl: './leads-nav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsNavComponent {
  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService) { }

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

}
