import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent implements OnInit {
  @Input() dataResumenPlan: any | undefined;
  dataResumen: any = {
    titulo: 'Resumen del pedido',
    titulo2: 'Super Fibra Óptica',
    precioEntero: '$22',
    precioDecimal: '31',
    periodicidad: '/mes',
    detalle1: 'Upgrade a 200 megas por siempre',
    detalle2: 'Instalación sin costo',
    detalle3: 'Equipo WIFI sin costo',
    detalle4: 'Xtrim Play gratis',
    detalle5: 'PERMANENCIA DE 24 MESES'
  };

  constructor() {}

  ngOnInit(): void {
    console.log('dataResumenPlan ', this.dataResumenPlan);
    if (this.dataResumenPlan !== undefined) {
      this.dataResumen.titulo2 = this.dataResumenPlan.titulo;
      this.dataResumen.precioEntero = this.dataResumenPlan.precioEntero;
      this.dataResumen.precioDecimal = this.dataResumenPlan.precioDecimal;
    }
  }

}
