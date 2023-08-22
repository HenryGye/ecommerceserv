import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  timeLineDatosPersonales: boolean = false;
  timeLineCobertura: boolean = false;
  timeLineBiometriaFacial: boolean = false;
  timeLineInstalacion: boolean = false;
  timeLineActivo1: boolean = false;
  timeLineActivo2: boolean = false;
  timeLineActivo3: boolean = false;
  timeLineActivo4: boolean = false;
  isSmallScreen: boolean | undefined;

  constructor(private sharedService: SharedService) {
    
  }

  public ngOnInit(): void {
    this.updateResponsiveLayout();
    window.addEventListener('resize', this.updateResponsiveLayout.bind(this));

    this.timeLineDatosPersonales = this.sharedService.getTimeLineDatosPersonales();
    this.timeLineCobertura = this.sharedService.getTimeLineCobertura();
    this.timeLineBiometriaFacial = this.sharedService.getTimeLineBiometriaFacial();
    this.timeLineInstalacion = this.sharedService.getTimeLineInstalacion();

    this.timeLineActivo1 = this.sharedService.getTimeLineActivo1();
    this.timeLineActivo2 = this.sharedService.getTimeLineActivo2();
    this.timeLineActivo3 = this.sharedService.getTimeLineActivo3();
    this.timeLineActivo4 = this.sharedService.getTimeLineActivo4();
  }

  updateResponsiveLayout() {
    this.isSmallScreen = window.innerWidth <= 768;
  }
}
