import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(
    private sharedService: SharedService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineActivo3(true);
  }

  ngOnInit(): void {
  }

  solicitarValidacion() {
    console.log('solicitar validacion');
    this.panelSolicitarValidacion = false;
    this.panelValidaIdentidad = true;
    this.panelVerificaIdentidad = true;
    // logica para habilitar boton una vez que se ha verificado por whatsapp o correo
    setTimeout(() => {
      this.panelVerificaIdentidad = false;
      this.panelValidacionExitosa = true;
      this.showValidacionExistosa();
      this.validacionExistosa = true;
    }, 3000);
  }

  showValidacionExistosa() {
    this.spinner = true;
    setTimeout(() => {
      this.showIconValidacionExistosa = true;
      this.spinner = false;
    }, 500);
  }

  continuar() {
    this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routerparams.navigate(['compra-en-linea/instalacion']);
    });
  }
}
