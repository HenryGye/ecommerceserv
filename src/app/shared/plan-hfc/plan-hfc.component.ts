import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-hfc',
  templateUrl: './plan-hfc.component.html',
  styleUrls: ['./plan-hfc.component.css']
})
export class PlanHfcComponent {
  planes: any[] = [
    {
      id: 1,
      titulo: 'Súper HFC',
      precioEntero: '$22,',
      precioDecimal: '31',
      periodicidad: '',
      img: 'assets/img/super-hfc-200-megas.png',
      descripcion: 'PARA LOS AMANTES DEL ENTRETENIMIENTO'
    },
    {
      id: 2,
      titulo: 'Turbo HFC',
      precioEntero: '$49,',
      precioDecimal: '10',
      periodicidad: '',
      img: 'assets/img/super-hfc-300-megas.png',
      descripcion: 'PARA LOS AMANTES DEL ENTRETENIMIENTO'
    }
  ];
}
