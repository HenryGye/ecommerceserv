import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  
  flagDisabled: boolean = true;

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  public ngOnInit(): void {}

  initializeForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required]),
      codigoDactilar:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      callePrincipal: new FormControl('', [Validators.required]),
      calleSecundaria: new FormControl('', [Validators.required]),
      manzana: new FormControl('', [Validators.required]),
      villa: new FormControl('', [Validators.required]),
      referencia: new FormControl('', [Validators.required]),
      acepto: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  submitForm() {
    if (this.form != undefined && this.form.valid) {
      alert('Continuará..');
    } else {
    }
  }
}
