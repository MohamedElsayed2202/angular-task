import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const samePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
  const pass = control.get('password');
  const conf = control.get('confirm');

  return pass && conf && pass.value !== conf.value ? {notSame: true} : null
}

@Directive({
  selector: '[appSamePassword]'
})
export class SamePasswordDirective {

  constructor() { }

}
