import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, shareReplay, startWith, take} from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import {FormControl, FormGroup} from "@angular/forms";

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

  private _chosenActivitiesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public chosenActivities$: Observable<string[]> = this._chosenActivitiesSubject.asObservable().pipe(startWith([]));

  readonly sizes: Array<any> = [
    {
      label: '0-50',
      sizeFloor: 0
    },
    {
      label: '51-100',
      sizeFloor: 51
    },
    {
      label: '101-500',
      sizeFloor: 101
    },
    {
      label: '501-1000',
      sizeFloor: 501
    },
    {
      label: '1001+',
      sizeFloor: 1001
    }
  ]

  readonly form: FormGroup = new FormGroup({
    sizes: new FormControl(),
    scopes: new FormControl()
  });

  readonly leadsWithActivities$ = combineLatest([
    this.leads$,
    this.activities$
  ]).pipe(
    map(([leads, activities]) => {
        return this._mapToLeadsWithActivities(leads.data, activities.data)
      }
    ),
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

  filterByActivity(activities: string[], lead: any): boolean {
    return activities.length > 0 ? !!activities.find(id => lead.scope.includes(id)) : true;
  }

  readonly filteredLeadsWithActivities$ = combineLatest([
    this.leadsWithActivities$,
    this.chosenActivities$
  ]).pipe(
    map(([leadsWithActivities, chosenActivities]) => {
      return leadsWithActivities
        .filter((leadWithActivities: any) => this.filterByActivity(chosenActivities, leadWithActivities))
    }),
    shareReplay(1)
  )

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

  doesIncludeItem(chosenItem: string): boolean {
    let activitiesArray: string[] = [];
    this.chosenActivities$.subscribe((activities) => {
      activitiesArray = activities;
    })

    return activitiesArray.includes(chosenItem);
  }

  onActivityChange(event: any, chosenItem: string): void {
    this._chosenActivitiesSubject.pipe(take(1)).subscribe(items => {
      let updatedItems: Set<string> = new Set<string>(items);
      event.target.checked ? updatedItems.add(chosenItem) : updatedItems.delete(chosenItem);
      this._chosenActivitiesSubject.next(Array.from(updatedItems));
    })
  }

  onFormSubmitted(form: FormGroup): void {
    console.log(form)
  }
}
