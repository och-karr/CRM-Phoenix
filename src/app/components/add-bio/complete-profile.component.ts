import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompleteProfileComponent {
  readonly form: FormGroup = new FormGroup({
    bio: new FormControl('', [Validators.required, Validators.pattern('^(?=(?:\\S+\\s+){9,}\\S+)(?=(?:[^.?!]+[.?!]\\s+){1,})[\\s\\S]*$')])
  });

  constructor(private _userService: UserService, private _router: Router){}

  logoutUser() {
    this._userService.logout();
    this._router.navigate(['/auth/login']);
  }

  onFormSubmitted(form: FormGroup) {
    this._userService.addBio({
      data: {
        content: form.get('bio')?.value
      },
    })
      .subscribe({
        next: () => {
          this._router.navigate(['/leads'])
        },
        error: () => {
        }
      })
  }
}
