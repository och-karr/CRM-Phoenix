import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leads-table',
  styleUrls: ['./leads-table.component.scss'],
  templateUrl: './leads-table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsTableComponent {
  constructor(private _userService: UserService, private _router: Router) {}

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/auth/login']);
  }
}
