import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorsDirective } from './directives/validation-errors.directive';
import { ValidationErrorsService } from './services/validation-errors.service';

import { EqualToValidatorDirective } from './rules/equalto.validation-rule';
import { NG_VALIDATORS } from '@angular/forms';

@NgModule({
    declarations: [
        ValidationErrorsDirective,
        EqualToValidatorDirective,
    ],
    imports: [ CommonModule ],
    exports: [
        ValidationErrorsDirective,
        EqualToValidatorDirective,
    ],
    providers: [
        ValidationErrorsService.withConfig({
            lang:{
                en:{
                    'pattern': "Is not compatible with rules pattern",
                    'required': "This field is required",
                    'min': "Has to be upper o equal than required value",
                    'max': "Has to be lower o equal than required value",
                    'step': "The value has to be a correct iteration",
                    'maxlength': "The number of charts has to be lower than required",
                    'minlength': "The number of charts has to be upper than required",
                    "equalto": "The field is not equalt to reference",
                    "email": "Has to be a valid email pattern",
                }
            }
        }),
    ],
})
export class ValidationErrorsModule {
    
}