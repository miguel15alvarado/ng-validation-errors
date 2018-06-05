import { Directive, Input, ElementRef } from '@angular/core';
import { NgModel, NgForm, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidationErrorsService } from '../services/validation-errors.service';

@Directive({
    selector: '[validationErrors]',
    exportAs: 'validationRef'
})
export class ValidationErrorsDirective {
    private errorList;

    _validationErrors:NgForm | FormGroup
    @Input()
    set validationErrors(form:NgForm | FormGroup){
        this._validationErrors = form;
        if(this._validationErrors instanceof NgForm){
            this.workForNgForm();
        }
    }
    get validationErrors() : NgForm | FormGroup{
        return this._validationErrors;
    }

    @Input() customClass:string;

    private lastErrors = new Array();

    constructor(
        private el: ElementRef,
        private s: ValidationErrorsService,
    ){
    }

    public submit(){
        this.workForFormGroup();
    }

    private workForFormGroup(){
        if(this._validationErrors instanceof FormGroup){
            this.showErrors(this._validationErrors.controls,"formcontrolname");
        }
    }

    private workForNgForm(){
        if(this._validationErrors instanceof NgForm){
            let form:NgForm = this._validationErrors;
            form.ngSubmit.subscribe(()=>{ 
                this.showErrors(form.controls,"name");
            })
        }
    }

    private showErrors(controls:{[key:string]:AbstractControl},nameSearch){
        this.errorList = this.s.getErrorList();
        this.clearErrors();
        
        let el:HTMLInputElement = this.el.nativeElement

        for(let key in controls){
            let controlElement = el.querySelector("["+nameSearch+"=\""+key+"\"]");

            let errorElement = document.createElement("ul");
            if(!this.customClass){
                errorElement.classList.add('default-error');
            }else{
                errorElement.classList.add(this.customClass);
            }
            
            let allErrors = ""
            for(let error in controls[key].errors){

                let errorMessage:any = el.querySelector("["+nameSearch+"=\""+key+"\"]").attributes.getNamedItem("data-"+error+"-message");
                if(errorMessage){
                    allErrors += "<li>"+errorMessage.value+"</li>";
                }else {
                    allErrors += "<li>"+this.errorList[error]+"</li>";
                }
            }
            errorElement.innerHTML = allErrors;

            this.lastErrors.push(controlElement.insertAdjacentElement("afterend",errorElement));
        }
    }

    private clearErrors(){
        let el:HTMLInputElement = this.el.nativeElement;
        this.lastErrors.forEach((ele)=>{
            try{
                el.removeChild(ele);
            }
            catch(e){
                console.log(e);
            }
        })
        this.lastErrors = new Array();
    }
}