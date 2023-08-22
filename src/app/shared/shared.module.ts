import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { ResumenPedidoComponent } from './resumen-pedido/resumen-pedido.component';
import { CalendarioFechaComponent } from './calendario-fecha/calendario-fecha.component';
import { CalendarioHorarioComponent } from './calendario-horario/calendario-horario.component';
import { SharedService } from './shared.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimelineComponent,
    ResumenPedidoComponent,
    CalendarioFechaComponent,
    CalendarioHorarioComponent
  ],
  exports: [
    CommonModule,
    TimelineComponent,
    ResumenPedidoComponent,
    CalendarioFechaComponent,
    CalendarioHorarioComponent
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule {
  constructor() {
  }
}
