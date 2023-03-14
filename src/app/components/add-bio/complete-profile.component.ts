import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompleteProfileComponent {
  readonly bio$ = this._userService.getBio().subscribe();

  constructor(private _userService: UserService) {
  }
}
