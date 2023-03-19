import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLeadComponent {
  constructor(private _userService: UserService, private _router: Router) { }

  readonly leadInformation: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    websiteLink: new FormControl(''),
    linkedinLink: new FormControl(''),
    location: new FormControl(''),
    industry: new FormControl(''),
    annualRevenue: new FormControl(''),
  })

  readonly activities: FormGroup = new FormGroup({
    internalProject: new FormControl(''),
    externalProject: new FormControl(''),
    recruitmentAgency: new FormControl(''),
  })

  readonly companySize: FormGroup = new FormGroup({
    totalSize: new FormControl(''),
    devSize: new FormControl(''),
    feSize: new FormControl(''),
  })

  readonly hiringInformation: FormGroup = new FormGroup({
    currently: new FormControl(''),
    junior: new FormControl(''),
    talent: new FormControl(''),
  })

  readonly form: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
    leadInformation: this.leadInformation,
    activities: this.activities,
    companySize: this.companySize,
    hiringInformation: this.hiringInformation,
    termsAccepted: new FormControl(false, [Validators.requiredTrue]),
  });

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/logout']);
  }

  onFormSubmitted(form: FormGroup) {

  }
}
