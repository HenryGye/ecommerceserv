import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(private routerparams: Router) {}

  regresarInicio() {
    // this.routerparams.navigate(['compra-en-linea/cobertura']);
    history.back();
  }
}
