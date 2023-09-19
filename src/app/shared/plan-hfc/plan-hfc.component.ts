import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-hfc',
  templateUrl: './plan-hfc.component.html',
  styleUrls: ['./plan-hfc.component.css']
})
export class PlanHfcComponent implements OnInit {
  planes: any[] = [
    {
      id: 1,
      titulo: 'Súper HFC',
      precioEntero: '$22',
      precioDecimal: '31',
      periodicidad: '',
      img: 'assets/img/super-hfc-200-megas.png',
      descripcion: 'PARA LOS AMANTES DEL ENTRETENIMIENTO'
    },
    {
      id: 2,
      titulo: 'Turbo HFC',
      precioEntero: '$49',
      precioDecimal: '10',
      periodicidad: '',
      img: 'assets/img/super-hfc-300-megas.png',
      descripcion: 'PARA LOS AMANTES DEL ENTRETENIMIENTO'
    }
  ];

  constructor(private routerparams: Router) {}

  ngOnInit(): void {}

  continuar(idPlan: number) {
    let planes = this.planes.filter(e => e.id === idPlan)[0];
    this.routerparams.navigate(['compra-en-linea/datos-personales'], { state: { planes: planes } });
  }
}
