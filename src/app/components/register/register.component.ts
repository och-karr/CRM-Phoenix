import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {isPasswordValid} from "../../../assets/js/validators/isPasswordValid";
import {doPasswordsMatch} from "../../../assets/js/validators/doPasswordsMatch";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  readonly passwords: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: [doPasswordsMatch, isPasswordValid]})

  readonly form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: this.passwords,
    termsAccepted: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private _userService: UserService, private _router: Router, private cd: ChangeDetectorRef) {}

  onFormSubmitted(form: FormGroup): void {
    if (form.valid) {
      this._userService.register({
        data: {
          email: form.get('email')?.value,
          password: form.get('passwords')?.get('password')?.value
        }
      }).subscribe({
        next: () => {
          this._router.navigate(['/auth/login'])
        },
        error: (err) => {
          this.form.setErrors({
            beValidation: err.error.message
          })
          this.cd.markForCheck()
        }
      })
    }
  }
}
