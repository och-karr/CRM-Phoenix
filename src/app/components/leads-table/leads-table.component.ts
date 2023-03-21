import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, map, shareReplay, startWith, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import { RoleService } from '../../services/context/role.service';

@Component({
  selector: 'app-leads-table',
  styleUrls: ['./leads-table.component.scss'],
  templateUrl: './leads-table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsTableComponent {
  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService, private _roleService: RoleService) { }

  readonly userRole$: Observable<string | null> = this._roleService.get();

  readonly leads$: Observable<any> = this._leadsService.getLeads().pipe(
    tap(data => console.log(data))
  );
  readonly activities$: Observable<any> = this._leadsService.getActivities();

  private _chosenActivitiesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public chosenActivities$: Observable<string[]> = this._chosenActivitiesSubject.asObservable().pipe(startWith([]));

  private _chosenSizesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public chosenSizes$: Observable<string[]> = this._chosenSizesSubject.asObservable().pipe(startWith([]));

  readonly sizes: Array<any> = [
    {
      label: '0-50',
      sizeVal: '0-50'
    },
    {
      label: '51-100',
      sizeVal: '51-100'
    },
    {
      label: '101-500',
      sizeVal: '101-500'
    },
    {
      label: '501-1000',
      sizeVal: '501-1000'
    },
    {
      label: '1001+',
      sizeVal: '1001'
    }
  ]

  readonly form: FormGroup = new FormGroup({});

  public leadsWithActivities$ = combineLatest([
    this.leads$,
    this.activities$
  ]).pipe(
    map(([leads, activities]) => {
      return this._mapToLeadsWithActivities(leads.data, activities.data)
    }
    ),
  )

  private _mapToLeadsWithActivities(leads: any, activities: any): any {
    const activitiesMap = activities.reduce((a: any, c: any) => ({ ...a, [c.id]: c }), {}) as Record<string, any>

    return leads.map((lead: any) => ({
      name: {
        companyName: lead.name,
        linkedinLink: lead.linkedinLink,
        websiteLink: lead.websiteLink
      },
      scope: lead.activityIds.map((id: any) => activitiesMap[id]?.name),
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

  filterByActivity(activities: string[], lead: any): boolean {
    return activities.length > 0 ? !!activities.find(name => lead.scope.includes(name)) : true;
  }

  filterBySize(sizes: string[], lead: any) {
    if (sizes.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].split('-').length > 1) {
          const [minSize, maxSize] = sizes[i].split('-');

          if (lead.size.total >= minSize && lead.size.total <= maxSize) {
            return true;
          }
        } else {
          const minSize = sizes[i].split('-')[0];
          return lead.size.total >= minSize;
        }
      }
    } else {
      return true;
    }

    return false;
  }

  readonly filteredLeadsWithActivities$ = combineLatest([
    this.leadsWithActivities$,
    this.chosenActivities$,
    this.chosenSizes$
  ]).pipe(
    map(([leadsWithActivities, chosenActivities, chosenSizes]) => {
      return leadsWithActivities
        .filter((leadWithActivities: any) => this.filterByActivity(chosenActivities, leadWithActivities))
        .filter((leadWithActivities: any) => this.filterBySize(chosenSizes, leadWithActivities))
    }),
    shareReplay(1)
  )

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

  public updatedActivities: Set<string> = new Set<string>([]);
  public updatedSizes: Set<string> = new Set<string>([]);

  onActivityChange(event: any, chosenItem: string): void {
    event.target.checked ? this.updatedActivities.add(chosenItem) : this.updatedActivities.delete(chosenItem);
  }

  onSizeChange(event: any, chosenItem: string): void {
    event.target.checked ? this.updatedSizes.add(chosenItem) : this.updatedSizes.delete(chosenItem);
  }

  onFormSubmitted(): void {
    this._chosenActivitiesSubject.next(Array.from(this.updatedActivities));
    this._chosenSizesSubject.next(Array.from(this.updatedSizes));
  }
}
