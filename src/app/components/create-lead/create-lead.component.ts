import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable, tap} from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import {atLeastOneSelected} from "../../../assets/js/validators/atLeastOneSelected";
import {AuthModel} from "../../models/auth.model";

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLeadComponent {
  private allActivitiesIds: string[] = [];

  readonly activities$: Observable<AuthModel<any[]>> = this._leadsService.getActivities().pipe(
    tap((activities) => {
      this.createFormControlForCheckboxes(activities.data);
      this.allActivitiesIds = [];
      activities.data.forEach((activity: any) => this.allActivitiesIds.push(activity.id));
    })
  );

  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService) { }

  readonly leadInformation: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    websiteLink: new FormControl('', [Validators.required, Validators.pattern('^(https?://)([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$')]),
    linkedinLink: new FormControl('', [Validators.required, Validators.pattern('^https?://(?:www\\.)?linkedin\\.com/(?:in|company)/[a-zA-Z0-9_-]+/?$')]),
    location: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    annualRevenue: new FormControl('', [Validators.required]),
  })

  readonly activities: FormGroup = new FormGroup({},{validators: [atLeastOneSelected]})

  readonly companySize: FormGroup = new FormGroup({
    totalSize: new FormControl('', [Validators.required, Validators.min(1)]),
    devSize: new FormControl('', [Validators.required,  Validators.min(1)]),
    feSize: new FormControl('', [Validators.required,  Validators.min(1)]),
  })

  readonly hiringInformation: FormGroup = new FormGroup({
    currently: new FormControl(false),
    junior: new FormControl(false),
    talent: new FormControl(false),
  },{validators: [atLeastOneSelected]})

  readonly form: FormGroup = new FormGroup({
    status: new FormControl('Preliminaries', [Validators.required]),
    notes: new FormControl(''),
    leadInformation: this.leadInformation,
    activities: this.activities,
    companySize: this.companySize,
    hiringInformation: this.hiringInformation
  });

  private createFormControlForCheckboxes(items: any[]) {
    const targetGroup: FormGroup = this.form.get('activities') as FormGroup;
    items.forEach((item) => targetGroup.addControl(item.id, new FormControl(false)));
  }

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

  onFormSubmitted(form: FormGroup) {
    let activitiesIds = [];
    for(let i = 0; i < this.allActivitiesIds.length; i++) {
      if (form.get('activities')?.get(this.allActivitiesIds[i])?.value) {
        activitiesIds.push(this.allActivitiesIds[i])
      }
    }
    let formObj = ({
      data: {
        name: form.get('leadInformation')?.get('companyName')?.value,
        websiteLink: form.get('leadInformation')?.get('websiteLink')?.value,
        linkedinLink: form.get('leadInformation')?.get('linkedinLink')?.value,
        location: form.get('leadInformation')?.get('location')?.value,
        industry: form.get('leadInformation')?.get('industry')?.value,
        annualRevenue: form.get('leadInformation')?.get('annualRevenue')?.value,
        activityIds: activitiesIds,
        companySize: {
          total: form.get('companySize')?.get('totalSize')?.value,
          dev: form.get('companySize')?.get('devSize')?.value,
          fe: form.get('companySize')?.get('feSize')?.value
        },
        hiring: {
          active: form.get('hiringInformation')?.get('currently')?.value,
          junior: form.get('hiringInformation')?.get('junior')?.value,
          talentProgram: form.get('hiringInformation')?.get('talent')?.value
        }
      }
    });
    if (form.valid) {
      this._leadsService.createLead(formObj).subscribe({
        next: () => {
          this._router.navigate(['/leads']);
        },
        error: (err: ErrorEvent) => {
          console.log(err.message)
        }
      });
    }
  }
}
