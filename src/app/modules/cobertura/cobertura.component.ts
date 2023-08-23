import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})
export class CoberturaComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineActivo2(true);
  }

  ngOnInit(): void {
  }

  continuar() {
    console.log('clickk');
    this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routerparams.navigate(['compra-en-linea/datos-personales']);
      // this.routerparams.navigate(['compra-en-linea/datos-personales', {p:2}]);
    });
    // this.routerparams.navigate(['compra-en-linea/datos-personales', '']);
  }
}
