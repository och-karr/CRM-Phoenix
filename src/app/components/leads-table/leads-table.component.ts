import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
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
  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService) { }

  readonly leads$: Observable<any> = this._leadsService.getLeads();
  readonly activities$: Observable<any> = this._leadsService.getActivities();

  readonly leadsWithActivities$ = combineLatest([
    this.leads$,
    this.activities$
  ]).pipe(
    map(([leads, activities]) =>
      this._mapToLeadsWithActivities(leads.data, activities.data)
    )
  )

  private _mapToLeadsWithActivities(leads: any, activities: any): any {
    const activitiesMap = activities.reduce((a: any, c: any) => ({...a, [c.id]: c}), {}) as Record<string, any>

    return leads.map((lead: any) => ({
        name: {
          companyName: lead.name,
          linkedinLink: lead.linkedinLink,
          websiteLink: lead.websiteLink
        },
        scope: lead.activityIds.map((id: any) => activitiesMap[id].name),
        hiring: {
          isHiring: lead.hiring.active,
          juniors: lead.hiring.junior,
          talentProgram: lead.hiring.talentProgram
        },
        industry: lead.industry,
        location: lead.location,
        size: {
          total: lead.companySize.total,
          dev: lead.companySize.dev,
          fe: lead.companySize.fe
        },
        revenue: {
          total: lead.annualRevenue,
          pe: 1
        }
      })
    )
  }

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }
}
