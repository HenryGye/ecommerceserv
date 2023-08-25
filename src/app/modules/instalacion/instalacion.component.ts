import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-instalacion',
  templateUrl: './instalacion.component.html',
  styleUrls: ['./instalacion.component.css']
})
export class InstalacionComponent {
  panelInstalacionServicio: boolean = true;
  panelRegistroCompleto: boolean = false;

  constructor(
    private sharedService: SharedService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineInstalacion(true);
    this.sharedService.setTimeLineActivo4(true);
  }

  continuar() {
    // si todo ok
    this.panelInstalacionServicio = false;
    this.panelRegistroCompleto = true;
  }

  regresarInicio() {
    this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routerparams.navigate(['compra-en-linea/cobertura']);
    });
  }
}
