import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-leads-table',
  styleUrls: ['./leads-table.component.scss'],
  templateUrl: './leads-table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsTableComponent {
  readonly leads$: Observable<any> = this._leadsService.getLeads();

  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService) { }

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }
}
