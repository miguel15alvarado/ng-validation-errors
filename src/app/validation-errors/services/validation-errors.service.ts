import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { getLocaleId } from '@angular/common';

export interface ValidationErrorsConfig {
    lang:{[key:string]:{[key:string]:string}}
}

const defaultErrors = {
    'pattern': "No cumple con el patron requerido",
    'required': "Dato obligatorio",
    'min': "El valor debe ser mayor o igual que el requerido",
    'max': "El valor debe ser menor o igual al requerido",
    'step': "El valor debe ser un interativo correcto",
    'maxlength': "El numero de caracteres no puede exceder el maximo requerido",
    'minlength': "El numero de caracteres no puede exceder el minimo requerido",
    "equalto": "El parametro debe ser igual al referido",
    "email": "Debes ingresar un correo valido",
}



@Injectable()
export class ValidationErrorsService {
    private locale;
    private static config:ValidationErrorsConfig;

    constructor(
        @Inject(LOCALE_ID) locale:string,
    ){
        this.locale = locale[0]+locale[1];
    }
    static withConfig(config:ValidationErrorsConfig){
        ValidationErrorsService.config = config;
        return ValidationErrorsService;
    }
    getErrorList() {
        if((this.locale in ValidationErrorsService.config.lang)){
            return ValidationErrorsService.config.lang[this.locale];
        }
        return defaultErrors
    }
}

//default config
ValidationErrorsService.withConfig({
    lang:{
        es: defaultErrors
    }
});