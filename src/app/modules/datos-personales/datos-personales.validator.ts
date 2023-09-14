import {Inject, Injectable} from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesValidator {
    constructor() {}
  
    tipoDocumentoValidator(control: AbstractControl): ValidationErrors | null {
      let formGroup = control.parent;
      let valid: boolean = true;
      let message: string = "";

      // if (control.value.length > 10){
      //   valid = false;
      //   message = "La cédula debe tener máximo 10 caracteres";
      // }
      
      if (DatosPersonalesValidator.validateCedula(control.value)) {
        valid = false;
        message = "Cédula inválida";
      }

      return !valid ? {error: message} : null;
  }

  static validateCedula(value: any): boolean {
    let cad = value.trim();
    let error: boolean = false;
    let total = 0;
    let longitud = cad.length;
    let longcheck = longitud - 1;
    if (cad !== "" && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          let aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }
      total = total % 10 ? 10 - (total % 10) : 0;
      if (cad.charAt(longitud - 1) == total) {
        error = false;
      } else {
        error = true;
      }
    } else {
      error = true;
    }
    return error;
  }
}