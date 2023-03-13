import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

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
