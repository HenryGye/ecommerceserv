import { Component, EventEmitter, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { CoberturaService } from './cobertura.service';
import { CoberturaRequest } from './cobertura';
import { Subscription, filter, map, of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})
export class CoberturaComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formNoCobertura!: FormGroup;
  cobertura: boolean  = true;
  sinCobertura: boolean = false;
  panelCobertura: boolean = false;
  gpon: boolean = false;
  hfc: boolean = false;
  showCaptcha: boolean = false;
  spinner: boolean = false;
  captchaValidado: boolean = false;
  subSectorId!: number;
  listaPrediccion: any[] = [];
  showListPrediccion: boolean = false;
  private coberturaSubscription = new Subscription;
  private resultadoPrediccionSubscription = new Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private sharedService: SharedService,
    private coberturaService: CoberturaService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineActivo2(true);
    this.sharedService.setTimeLineActivo1(false);
    this.sharedService.setTimeLineActivo3(false);
    this.sharedService.setTimeLineActivo4(false);
    this.initializeForm();
    this.initializeFormNoCobertura();

    const direccionString = localStorage.getItem('direccion');
    this.form.get('direccion')?.patchValue(direccionString !== null ? direccionString : null);
  }

  ngOnInit(): void {
    this.coberturaSubscription = this.sharedService.getResultadoDireccion().pipe(
      filter((direccion) => !!direccion),
      switchMap(resultado => {
        console.log('coordenadas ', resultado);
        this.showListPrediccion = false;
        if (resultado !== -1) {
          let body: CoberturaRequest = { latitude: resultado.lat, longitude: resultado.lng };
          return this.coberturaService.consultarCobertura(body);
        }
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        console.log('data ', data);
        if (data === null) {
          this.form.setErrors({'valid': false});
          this.messageService.add({severity:'error', detail: '¡No se pudo encontrar la dirección!'});
          return;
        }

        if (!data.success) {
          this.form.setErrors({'valid': false});
          this.cobertura = false;
          this.sinCobertura = true;
          return;
        }

        this.gpon = false;
        this.hfc = false;

        data.data?.nodes.forEach(element => {
          if (element.technology === 'GPON') this.gpon = true;
          if (element.technology === 'HFC') this.hfc = true;
        });

        if (this.gpon || (this.gpon && this.hfc)) {
          this.cobertura = true;
          this.sinCobertura = false;
          this.form.setErrors(null);
        } else {
          this.form.setErrors({'valid': false});
          this.cobertura = false;
          this.sinCobertura = false;
        }
        this.subSectorId = data.data?.subSectorId || 0;
        localStorage.setItem('subSectorId', this.subSectorId.toString());
        localStorage.setItem('direccion', this.form.get('direccion')?.value);
      },
      error: (error) => {
        console.log('error ', error);
        this.form.setErrors({'valid': false});
        this.messageService.add({severity:'error', detail: '¡Ha ocurrido un error. Por favor intente nuevamente!'});
        localStorage.clear();
      }
    });

    this.resultadoPrediccionSubscription = this.sharedService.getResultadoPrediccion().pipe(
      filter((direccion) => !!direccion),
      switchMap(resultado => {
        if (resultado !== -1) {
          return of(resultado);
        }
        return of(null);
      })
    ).subscribe(data => {
      console.log('listaPrediccion ', this.listaPrediccion);
      if (data) {
        this.listaPrediccion = data;
        this.showListPrediccion = true;
      } else {
        this.listaPrediccion = [];
        this.showListPrediccion = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.coberturaSubscription.unsubscribe();
    this.resultadoPrediccionSubscription.unsubscribe();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      direccion: new FormControl(null, [Validators.required])
    });
  }

  initializeFormNoCobertura() {
    this.formNoCobertura = this.formBuilder.group({
      nombres: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      acepto: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  continuar() {
    if (this.form != undefined && this.form.valid) {
      console.log('click');
      this.routerparams.navigate(['compra-en-linea/datos-personales']);
    }
  }

  continuarFormNoCobertura() {
    if (this.formNoCobertura != undefined && this.formNoCobertura.valid) {
      console.log('click no cobertura');
      // this.routerparams.navigate(['compra-en-linea/datos-personales']);
      this.panelCobertura = true;
    }
  }

  buscarDireccion() {
    if (this.form.get('direccion')?.value.trim()) {
      this.sharedService.setDireccion(this.form.get('direccion')?.value);
    }
  }

  buscarPrediccion() {
    if (this.form.get('direccion')?.value.trim()) {
      this.sharedService.setPrediccion(this.form.get('direccion')?.value);
    } else {
      this.listaPrediccion = [];
      this.showListPrediccion = false;
    }
  }

  seleccionarPrediccion(prediccion: string) {
    this.form.get('direccion')?.patchValue(prediccion);
    this.buscarDireccion();
  }

  onBlur() {
    setTimeout(() => {
      this.showListPrediccion = false;
    }, 300);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  validarCaptcha() {
    this.spinner = true;
    setTimeout(() => {
      this.captchaValidado = true;
      this.spinner = false;
    }, 2000);
  }
}
