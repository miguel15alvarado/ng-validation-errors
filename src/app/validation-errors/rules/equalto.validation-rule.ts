import { FormControl, NG_VALIDATORS, NgControl, ValidatorFn, AbstractControl, Validator, ValidationErrors, NgModel, FormControlName } from "@angular/forms";
import { Directive, Input, SimpleChanges, OnChanges, forwardRef, ChangeDetectorRef, ElementRef } from "@angular/core";
import { ValueTransformer } from "@angular/compiler/src/util";
import { Subscription } from "rxjs/Subscription";

export function equalToValidator(nameCompare:string) : ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const name: string = control.value;
        return name !== nameCompare ? {'equalto': true} : null;
    }
}

@Directive({
    selector: '[equalto],[equalto][ngModel]',
    providers:[
        {
            provide: NG_VALIDATORS, 
            useExisting: forwardRef(() => EqualToValidatorDirective), 
            multi: true 
        }
    ],
    host: {'[attr.equalto]': 'equalto ? equalto : null'}
  })
  export class EqualToValidatorDirective implements Validator {
    private _onChange: () => void;
    private _equalto:string;
    private c:AbstractControl;
    private subscription:Subscription;
    
    @Input()
    set equalto(value:string){
        this._equalto = value;
    }
    get equalto(){
        return this._equalto;
    }
    constructor(
        private el: ElementRef,
    ){
    }

    validate(c: AbstractControl): ValidationErrors{
        this.c = c;
        

        let e = this.c.value;
        let v = this.c.root.get(this.equalto).value;

        if(v && !this.subscription){
            this.subscription = this.c.root.get(this.equalto).valueChanges.subscribe((value)=>{
                if (this._onChange) this._onChange();
            })
        }
        
        if(e && v){
            return e !== v ? {
                'equalto': true
            } : null;
        }
        return null;
    }
    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}