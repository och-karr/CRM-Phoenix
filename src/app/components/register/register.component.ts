import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

export const doPasswordsMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password: string = control.get('password')?.value;
  const confirmPassword: string = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  if (password !== confirmPassword) {
    return { doPasswordsMatch: true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  readonly passwords: FormGroup = new FormGroup({
    password: new FormControl('qazWSX123!', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^*()])[A-Za-z\\d!@#$%^*()]{8,}$')]),
    confirmPassword: new FormControl('qazWSX123!', Validators.required)
  }, {validators: [doPasswordsMatch]})

  readonly form: FormGroup = new FormGroup({
    name: new FormControl('qqq', [Validators.required]),
    email: new FormControl('ktest3@wp.pl', [Validators.required, Validators.email]),
    passwords: this.passwords,
    termsAccepted: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private _userService: UserService, private _router: Router) {}

  onFormSubmitted(form: FormGroup): void {
    if (form.valid) {
      this._userService.register({
        data: {
          email: form.get('email')?.value,
          password: form.get('passwords')?.get('password')?.value
        }
      }).subscribe({
        next: () => {
          // this._router.navigate(['/'])
        },
        error: () => {
          // this._router.navigate(['/error'])
        }
      })
    }
  }
}
