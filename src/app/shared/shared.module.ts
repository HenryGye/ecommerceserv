import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { ResumenPedidoComponent } from './resumen-pedido/resumen-pedido.component';
import { CalendarioFechaComponent } from './calendario-fecha/calendario-fecha.component';
import { CalendarioHorarioComponent } from './calendario-horario/calendario-horario.component';
import { SharedService } from './shared.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map/google-map.component';
import { PlanHfcComponent } from './plan-hfc/plan-hfc.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  declarations: [
    TimelineComponent,
    ResumenPedidoComponent,
    CalendarioFechaComponent,
    CalendarioHorarioComponent,
    GoogleMapComponent,
    PlanHfcComponent
  ],
  exports: [
    CommonModule,
    TimelineComponent,
    ResumenPedidoComponent,
    CalendarioFechaComponent,
    CalendarioHorarioComponent,
    GoogleMapComponent,
    PlanHfcComponent
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule {
  constructor() {
  }
}
