import { Component, EventEmitter, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { CoberturaService } from './cobertura.service';
import { CoberturaRequest } from './cobertura';
import { Subscription, filter, of, switchMap } from 'rxjs';
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
  subSectorId!: number;
  panelCobertura: boolean = false;
  private coberturaSubscription = new Subscription;

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
          return;
        }

        console.log('success ', data);
        this.cobertura = true;
        this.form.setErrors(null);
        this.subSectorId = data.data?.subSectorId || 0;
        localStorage.setItem('subSectorId', this.subSectorId.toString());
        localStorage.setItem('direccion', this.form.get('direccion')?.value);
      },
      error: (error) => {
        console.log('error aqui', error);
        this.form.setErrors({'valid': false});
        this.messageService.add({severity:'error', detail: '¡Ha ocurrido un error. Por favor intente nuevamente!'});
        localStorage.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.coberturaSubscription.unsubscribe();
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
    this.sharedService.setDireccion(this.form.get('direccion')?.value);
  }
}
