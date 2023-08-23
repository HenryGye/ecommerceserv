import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Navigation, NavigationEnd } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  
  flagDisabled: boolean = true;

  form!: FormGroup;

  parametro: any;

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private activatedRoute: ActivatedRoute, private routerparams: Router) {
    this.initializeForm();
    // this.parametro = this.activatedRoute.snapshot.paramMap.get('p');
    // console.log('p', this.parametro);
    // if (this.parametro == 2) {
    //   console.log('entro qui');
    //   this.sharedService.setTimeLineCobertura(true);
    //   this.sharedService.setTimeLineDatosPersonales(true);
    //   this.sharedService.setTimeLineActivo1(true);
    // }
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineActivo1(true);
  }

  public ngOnInit(): void {
    
  }

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
