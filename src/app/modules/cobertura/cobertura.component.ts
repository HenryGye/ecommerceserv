import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { CoberturaService } from './cobertura.service';
import { CoberturaRequest } from './cobertura';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})
export class CoberturaComponent implements OnInit {
  form!: FormGroup;
  disabledButton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private coberturaService: CoberturaService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineActivo2(true);
    this.sharedService.setTimeLineActivo1(false);
    this.sharedService.setTimeLineActivo3(false);
    this.sharedService.setTimeLineActivo4(false);
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      direccion: new FormControl(null, [Validators.required])
    });
  }

  continuar() {
    if (this.form != undefined && this.form.valid) {
      console.log('click');
      // this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.routerparams.navigate(['compra-en-linea/datos-personales']);
      // });
      // this.routerparams.navigate(['compra-en-linea/datos-personales'], {state:{active:true}});
      this.routerparams.navigate(['compra-en-linea/datos-personales']);
    }
  }

  buscarDireccion() {
    this.sharedService.setDireccion(this.form.get('direccion')?.value);

    this.sharedService.getResultadoDireccion().pipe(
      switchMap(resultado => {
        if (resultado !== null) {
          let body: CoberturaRequest = {
            latitude: resultado.lat,
            longitude: resultado.lng
          };
          return this.coberturaService.postConsultarCobertura(body);
        }
        // Si no hay resultado, retorna un observable vacío
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data !== null) {
          console.log('data ', data);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.disabledButton = true;
  }
}
