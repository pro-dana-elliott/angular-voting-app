import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[cusMinValidate]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidateDirective, multi: true}]
})
export class MinValidateDirective implements Validator {

  @Input('cusMinValidate') minValue: number;

  validate(control: AbstractControl): {[key: string]: any} | null {
      return control.value < this.minValue ? { 'minValue': true } : null;
  }

}
