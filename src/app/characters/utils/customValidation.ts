import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomValidation {

  yearInputPatternValidator(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]{1,3}(?:\.[0-9]+)?(BBY|ABY)$');
      const isValid = regex.test(control.value);
      return isValid ? null : { invalidYearFormat: true };
    };
  }
}