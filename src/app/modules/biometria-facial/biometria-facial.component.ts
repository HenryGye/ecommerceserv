import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

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

  constructor(
    private sharedService: SharedService,
    private routerparams: Router,
    private activatedRoute: ActivatedRoute) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineActivo3(true);
    this.sharedService.setTimeLineActivo1(false);
    this.sharedService.setTimeLineActivo2(false);
    this.sharedService.setTimeLineActivo4(false);

    const fingerCodeUuid = localStorage.getItem('finger_code_uuid') || '';
    const urlBiometria = localStorage.getItem('url_biometria') || '';
    const urlRedirect = window.location.href + '&uid='; //localStorage.getItem('url_redirect') || '';

    if (fingerCodeUuid && urlBiometria && urlRedirect) {
      this.urlValidacionBiometriaFacial = urlBiometria + urlRedirect + fingerCodeUuid;
    }

    this.verificarRespuestaValidacionBiometrica();
  }

  ngOnInit(): void {
  }

  solicitarValidacion() {
    console.log('solicitar validacion ', this.urlValidacionBiometriaFacial);

    if (this.urlValidacionBiometriaFacial) {
      window.location.href = this.urlValidacionBiometriaFacial.replace('/#/', '/');
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
      this.routerparams.navigate(['compra-en-linea/instalacion']);
    });
  }
}
