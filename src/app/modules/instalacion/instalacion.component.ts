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
  dataResumenPlan: any | undefined;

  constructor(
    private sharedService: SharedService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineInstalacion(true);
    this.sharedService.setTimeLineActivo4(true);
    this.sharedService.setTimeLineActivo3(false);
    this.sharedService.setTimeLineActivo1(false);
    this.sharedService.setTimeLineActivo2(false);

    let state = history.state;
    if (state.planes !== undefined) {
      this.dataResumenPlan = state.planes;
    }
    console.log('state ', this.dataResumenPlan);
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
