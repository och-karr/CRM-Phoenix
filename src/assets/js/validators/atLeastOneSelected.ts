import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const atLeastOneSelected: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let controlValues: boolean[] = [];

  let numControls = 0;
  if (control instanceof FormGroup || control instanceof FormArray) {
    let controls = Object.keys(control.controls);
    numControls = controls.length;

    for(let i = 0; i<numControls; i++) {
      let controlValue: boolean = control.get(controls[i])?.value;
      controlValues.push(controlValue);
    }

    if (!controlValues.includes(true)) {
      return { atLeastOneSelected: 'Select at least one option' };
    }

    return null;
  }

  return null;
}
