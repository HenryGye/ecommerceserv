import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-instalacion',
  templateUrl: './instalacion.component.html',
  styleUrls: ['./instalacion.component.css']
})
export class InstalacionComponent {
  constructor(private sharedService: SharedService) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineInstalacion(true);
    this.sharedService.setTimeLineActivo4(true);
  }
}
