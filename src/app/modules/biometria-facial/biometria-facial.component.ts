import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { BiometriaFacialService } from './biometria-facial.service';
import { AceptacionContratoRequest } from '../datos-personales/datos-personales';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-biometria-facial',
  templateUrl: './biometria-facial.component.html',
  styleUrls: ['./biometria-facial.component.css']
})
export class BiometriaFacialComponent implements OnInit {
  // ocultar paneles inicialmente, solo se muestra el rimero
  panelSolicitarValidacion: boolean = true;
  panelValidaIdentidad: boolean = false;
  panelValidacionExitosa: boolean = false;
  panelVerificaIdentidad: boolean = false;

  validaIdentidad: boolean = false;
  validacionExistosa: boolean = false;
  
  spinner: boolean = false;
  showIconValidacionExistosa: boolean = false;

  urlValidacionBiometriaFacial: string = '';
  respuestaBiometria: any | undefined;
  dataResumenPlan: any | undefined;
  dataDatosPersonales: AceptacionContratoRequest | undefined;

  constructor(
    private sharedService: SharedService,
    private messageService: MessageService,
    private biometriaFacialService: BiometriaFacialService,
    private routerparams: Router,
    private activatedRoute: ActivatedRoute) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineActivo3(true);
    this.sharedService.setTimeLineActivo1(false);
    this.sharedService.setTimeLineActivo2(false);
    this.sharedService.setTimeLineActivo4(false);

    // const fingerCodeUuid = localStorage.getItem('finger_code_uuid') || '';
    // const urlBiometria = localStorage.getItem('url_biometria') || '';
    // const urlRedirect = window.location.href + '&uid='; //localStorage.getItem('url_redirect') || '';

    // if (fingerCodeUuid && urlBiometria && urlRedirect) {
    //   this.urlValidacionBiometriaFacial = urlBiometria + urlRedirect + fingerCodeUuid;
    // }

    this.verificarRespuestaValidacionBiometrica();

    let state = history.state;
    if (state.planes !== undefined) {
      this.dataResumenPlan = state.planes;
    }
    if (state.datosPersonales !== undefined) {
      this.dataDatosPersonales = state.datosPersonales;
    }
    console.log('state ', this.dataResumenPlan, this.dataDatosPersonales);
  }

  ngOnInit(): void {
  }

  solicitarValidacion() {
    // console.log('solicitar validacion ', this.urlValidacionBiometriaFacial);

    // if (this.urlValidacionBiometriaFacial) {
    //   window.location.href = this.urlValidacionBiometriaFacial.replace('/#/', '/%23/');
    // }

    if (this.dataDatosPersonales !== undefined) {
      this.panelSolicitarValidacion = false;
      this.panelValidaIdentidad = true;
      this.panelVerificaIdentidad = true;
      
      this.biometriaFacialService.guardarAceptacionContrato(this.dataDatosPersonales)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.success) {
            // this.spinner = false
            // localStorage.setItem('finger_code_uuid', data.finger_code_uuid);
            // localStorage.setItem('url_biometria', data.url_biometria);
            // localStorage.setItem('url_redirect', data.url_redirect);
          } else {
            // this.spinner = false
            this.messageService.add({severity: 'error', detail: '¡Ha ocurrido un error. Por favor intente nuevamente!'});
          }
        },
        error: (error) => {
          this.messageService.add({severity: 'error', detail: '¡Ha ocurrido un error. Por favor intente nuevamente!'});
          // this.spinner = false
          console.log(error);
        }
      });
    }


    // this.panelSolicitarValidacion = false;
    // this.panelValidaIdentidad = true;
    // this.panelVerificaIdentidad = true;
    // // logica para habilitar boton una vez que se ha verificado por whatsapp o correo
    // setTimeout(() => {
    //   this.panelVerificaIdentidad = false;
    //   this.panelValidacionExitosa = true;
    //   this.showValidacionExistosa();
    //   this.validacionExistosa = true;
    // }, 3000);
  }

  verificarRespuestaValidacionBiometrica() {
    this.respuestaBiometria = (this.activatedRoute.snapshot.queryParams['_Response']) ? JSON.parse(this.activatedRoute.snapshot.queryParams['_Response']) : undefined;
    console.log('params ', this.respuestaBiometria);

    if (this.respuestaBiometria) {
      const estado = (this.respuestaBiometria.Extras.StateName !== 'Error') ? true : false;
      // mostrar validacion exitosa o fallida
      this.panelSolicitarValidacion = false;
      this.panelValidaIdentidad = true;
      this.panelValidacionExitosa = true;
      this.showValidacionExistosa(estado);
      this.validacionExistosa = estado;
    }
  }

  showValidacionExistosa(estado: boolean) {
    this.spinner = true;
    setTimeout(() => {
      this.showIconValidacionExistosa = estado;
      this.spinner = false;
    }, 500);
  }

  continuar() {
    this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routerparams.navigate(['compra-en-linea/instalacion'], { state: { planes: this.dataResumenPlan } });
    });
  }
}
