import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const isPasswordValid: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password: string = control.get('password')?.value;

  const minCharsRegex = (/^.{8,}$/.test(password));
  const leastOneNumRegex = (/.*[0-9].*/.test(password));
  const leastSpecialRegex = (/(?=.*[!@#$%^*()])/.test(password));
  const leastOneCapital = (/(?=.*[A-Z])/.test(password));
  const leastOneSmall = (/(?=.*[a-z])/.test(password));

  if (password && !minCharsRegex) {
    return { isPasswordValid: 'Password must have more than 8 characters' };
  }

  if (password && !leastOneNumRegex) {
    return { isPasswordValid: 'Password must have at least one number' };
  }

  if (password && !leastSpecialRegex) {
    return { isPasswordValid: 'Password must have at least one special character: !@#$%^*()' };
  }

  if (password && !leastOneCapital) {
    return { isPasswordValid: 'Password must have at least one capital' };
  }

  if (password && !leastOneSmall) {
    return { isPasswordValid: 'Password must have at least one small character' };
  }

  return null;
}
