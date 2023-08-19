import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { ResumenPedidoComponent } from './resumen-pedido/resumen-pedido.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimelineComponent,
    ResumenPedidoComponent
  ],
  exports: [
    CommonModule,
    TimelineComponent,
    ResumenPedidoComponent
  ],
  providers: []
})
export class SharedModule {
  constructor() {
  }
}
