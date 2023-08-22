import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-biometria-facial',
  templateUrl: './biometria-facial.component.html',
  styleUrls: ['./biometria-facial.component.css']
})
export class BiometriaFacialComponent {
  constructor(private sharedService: SharedService) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineBiometriaFacial(true);
    this.sharedService.setTimeLineActivo3(true);
  }
}
