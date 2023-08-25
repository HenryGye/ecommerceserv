import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

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
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineActivo2(true);
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
      this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.routerparams.navigate(['compra-en-linea/datos-personales']);
      });
    }
  }

  buscarDireccion() {
    // console.log(this.form.get('direccion')?.value);
    this.sharedService.setDireccion(this.form.get('direccion')?.value);
  }
}
