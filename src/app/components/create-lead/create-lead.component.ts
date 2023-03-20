import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable, tap} from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLeadComponent {
  readonly activities$: Observable<any> = this._leadsService.getActivities().pipe(
    tap((activities) => {
      this.createFormControlForCheckboxes(activities.data);
    })
  );

  constructor(private _userService: UserService, private _router: Router, private _leadsService: LeadsService) { }

  readonly leadInformation: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    websiteLink: new FormControl(''),
    linkedinLink: new FormControl(''),
    location: new FormControl(''),
    industry: new FormControl(''),
    annualRevenue: new FormControl(''),
  })

  readonly activities: FormGroup = new FormGroup({
    // internalProject: new FormControl('', [Validators.required]),
    // externalProject: new FormControl('', [Validators.required]),
    // recruitmentAgency: new FormControl('', [Validators.required]),
  })

  readonly companySize: FormGroup = new FormGroup({
    totalSize: new FormControl(''),
    devSize: new FormControl(''),
    feSize: new FormControl(''),
  })

  readonly hiringInformation: FormGroup = new FormGroup({
    currently: new FormControl(false),
    junior: new FormControl(false),
    talent: new FormControl(false),
  })

  readonly form: FormGroup = new FormGroup({
    status: new FormControl(''),
    notes: new FormControl(''),
    leadInformation: this.leadInformation,
    activities: this.activities,
    companySize: this.companySize,
    hiringInformation: this.hiringInformation
  });

  // readonly leadInformation: FormGroup = new FormGroup({
  //   companyName: new FormControl('', [Validators.required]),
  //   websiteLink: new FormControl('', [Validators.required, Validators.pattern('^(https?://)([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$')]),
  //   linkedinLink: new FormControl('', [Validators.required, Validators.pattern('^https?://(?:www\\.)?linkedin\\.com/(?:in|company)/[a-zA-Z0-9_-]+/?$')]),
  //   location: new FormControl('', [Validators.required]),
  //   industry: new FormControl('', [Validators.required]),
  //   annualRevenue: new FormControl('', [Validators.required]),
  // })
  //
  // readonly activities: FormGroup = new FormGroup({
  //   // internalProject: new FormControl('', [Validators.required]),
  //   // externalProject: new FormControl('', [Validators.required]),
  //   // recruitmentAgency: new FormControl('', [Validators.required]),
  // })
  //
  // readonly companySize: FormGroup = new FormGroup({
  //   totalSize: new FormControl('', [Validators.required, Validators.min(0)]),
  //   devSize: new FormControl('', [Validators.required,  Validators.min(0)]),
  //   feSize: new FormControl('', [Validators.required,  Validators.min(0)]),
  // })
  //
  // readonly hiringInformation: FormGroup = new FormGroup({
  //   currently: new FormControl(false),
  //   junior: new FormControl(false),
  //   talent: new FormControl(false),
  // })
  //
  // readonly form: FormGroup = new FormGroup({
  //   status: new FormControl('', [Validators.required]),
  //   notes: new FormControl(''),
  //   leadInformation: this.leadInformation,
  //   activities: this.activities,
  //   companySize: this.companySize,
  //   hiringInformation: this.hiringInformation
  // });

  private createFormControlForCheckboxes(items: any[]) {
    const targetGroup: FormGroup = this.form.get('activities') as FormGroup;
    items.forEach((item, i) => targetGroup.addControl('activity-'+i, new FormControl(false)));
  }

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

  onFormSubmitted(form: FormGroup) {
    let formObj = ({
      data: {
        name: form.get('leadInformation')?.get('companyName')?.value,
        websiteLink: form.get('leadInformation')?.get('websiteLink')?.value,
        linkedinLink: form.get('leadInformation')?.get('linkedinLink')?.value,
        location: form.get('leadInformation')?.get('location')?.value,
        industry: form.get('leadInformation')?.get('industry')?.value,
        annualRevenue: form.get('leadInformation')?.get('annualRevenue')?.value,
        activityIds: [
          'Recruitment Agency'
        ],
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
    console.log(formObj);
    // if (form.valid) {
    //   this._leadsService.createLead(formObj).subscribe({
    //     next: () => {
    //       console.log('success')
    //     },
    //     error: (err: ErrorEvent) => {
    //       console.log(err.message)
    //     }
    //   });
    // }

    // this._userService.login( {
    //     data: {
    //       name: string,
    //       websiteLink: string,
    //       location: string,
    //       industry: string,
    //       annualRevenue: number,
    //       activityIds: string[],
    //       companySize: {
    //         total: number,
    //         dev: number,
    //         fe: number
    //       },
    //       hiring: {
    //         active: boolean,
    //         junior: boolean,
    //         talentProgram: boolean
    //       }
    //     }
    // })
    //   .subscribe({
    //     next: () => {
    //       this._router.navigate(['/leads'])
    //     },
    //     error: (err) => {
    //       this.form.setErrors({
    //         beValidation: err.error.message
    //       })
    //       this.cd.markForCheck()
    //     }
    //   })
  }
}
