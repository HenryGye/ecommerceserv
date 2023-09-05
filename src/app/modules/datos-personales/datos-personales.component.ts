import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Navigation, NavigationEnd } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { filter } from 'rxjs/operators';
import { DatosPersonalesService } from './datos-personales.service';
import { ConsultaDirDicTitanRequest, DatosPersonalesRequest, TokenCodigoDactilarRequest } from './datos-personales';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form!: FormGroup;
  parametro: any;
  showImg: boolean = false;
  disabledButton: boolean = false;
  subSectorId: number = +(localStorage.getItem('subSectorId') || 0);
  direccionTmp: string = localStorage.getItem('direccion') || '';
  listaCallePrincipal: any[] = [];
  listaCalleSecundaria: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private messageService: MessageService,
    private datosPersonalesService: DatosPersonalesService,
    private routerparams: Router) {
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineActivo1(true);
    this.sharedService.setTimeLineActivo2(false);
    this.sharedService.setTimeLineActivo3(false);
    this.sharedService.setTimeLineActivo4(false);
    this.initializeForm();

    // let state = this.routerparams.getCurrentNavigation()?.extras.state;
    // // let state = history.state;
    // if (state != undefined) {
    //   this.subSectorId = state['subSectorId'];
    //   this.direccionTmp = state['direccion'];
    // }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const img = document.getElementsByClassName('image-tooltip')[0];
    const imgSvg = document.getElementsByClassName('img-svg');
    if (event.target === imgSvg[0] || event.target === imgSvg[1]) {
      this.showImg = !this.showImg;
      return;
    }

    this.showImg = (event.target === img) ? true : false;
  }

  public ngOnInit(): void {
    console.log('subSectorId ', this.subSectorId, 'direccion ', this.direccionTmp);
    this.form.get('direccion')?.patchValue(this.direccionTmp);
    if (this.subSectorId != 0) {
      this.consultarCallePrincipal();
    }
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      cedula: new FormControl('', [Validators.required]),
      codigoDactilar:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      callePrincipal: new FormControl('', [Validators.required]),
      calleSecundaria: new FormControl('', [Validators.required]),
      manzana: new FormControl('', [Validators.required]),
      villa: new FormControl('', [Validators.required]),
      referencia: new FormControl('', [Validators.required]),
      acepto: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  submitForm() {
    if (this.form != undefined && this.form.valid) {
      // this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.routerparams.navigate(['compra-en-linea/biometria-facial']);
      // });
      console.log('click');
      this.consultarDatosCliente();
    }
  }

  consultarCallePrincipal() {
    let body: ConsultaDirDicTitanRequest = {
      id: this.subSectorId.toString(),
      tipo: '19'
    };
    this.datosPersonalesService.consultarCallePrincipalSecundaria(body)
    .subscribe({
      next: (data) => {
        if (data.success) {
          this.listaCallePrincipal = data.dataAddress;
          console.log('listaCallePrincipal ', this.listaCallePrincipal);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  consultarCalleSecundaria() {
    let body: ConsultaDirDicTitanRequest = {
      id: this.form.get('callePrincipal')?.value,
      tipo: '20'
    };
    this.datosPersonalesService.consultarCallePrincipalSecundaria(body)
    .subscribe({
      next: (data) => {
        if (data.success) {
          this.listaCalleSecundaria = data.dataAddress;
          console.log('listaCalleSecundaria ', this.listaCalleSecundaria);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cargarListaCalleSecundaria() {
    if (this.form.get('callePrincipal')?.value) {
      console.log('carga calle secundaria ');
      this.form.get('calleSecundaria')?.patchValue('');
      this.consultarCalleSecundaria();
    }
  }

  consultarDatosCliente() {
    let body: DatosPersonalesRequest = { dni: this.form.get('cedula')?.value };
    this.datosPersonalesService.consultarDatosClientes(body)
    .subscribe({
      next: (data) => {
        console.log('data ', data);
        if (data.success) {
          this.messageService.add({severity:'info', detail: '¡Cliente ya existe. No puede continuar con el flujo!'});
          return;
          // this.routerparams.navigate(['compra-en-linea/biometria-facial']);
        } else {
          this.messageService.add({severity:'error', detail: data.data.message});
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  consultarTokenCodigoDactilar() {
    let body: TokenCodigoDactilarRequest = {
      customerName: 'x',
      customerUsername: 'x',
      fingerCode: this.form.get('codigoDactilar')?.value,
      identificationNumber: this.form.get('cedula')?.value
    };
    this.datosPersonalesService.consultarTokenCodigoDactilar(body)
    .subscribe({
      next: (data) => {
        let res: any = data;
        if (res) {
          if (res.CodigoError === 0) {
            // this.listaCalleSecundaria = res.Objeto;
          }
          
          console.log('consultarTokenCodigoDactilar ', data);
        } else {
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
