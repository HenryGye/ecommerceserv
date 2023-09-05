import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Navigation, NavigationEnd } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { filter } from 'rxjs/operators';
import { DatosPersonalesService } from './datos-personales.service';
import { AceptacionContratoRequest, ConsultaDirDicTitanRequest, ConsultarBuroClienteRequest, DatosPersonalesRequest, TokenCodigoDactilarRequest } from './datos-personales';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

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

  customerName!: string | '';
  fingerCode!: string | '';

  spinner: boolean = false;

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

    const formularioString = localStorage.getItem('formulario');
    
    if (formularioString) {
      const formularioData = JSON.parse(formularioString);
      delete formularioData.callePrincipal;
      delete formularioData.calleSecundaria;
      this.form.patchValue(formularioData);
    }
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

  ngOnDestroy() {
    localStorage.setItem('formulario', JSON.stringify(this.form.value));
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
      this.spinner = true;
      this.consultarDatosCliente().subscribe({
        next: (dataCliente) => {
          console.log('dataCliente ', dataCliente);
          this.consultarBuroCliente().subscribe({
            next: (dataBuro) => {
              console.log('dataBuro ', dataBuro);
              this.consultarTokenCodigoDactilar(dataBuro).subscribe({
                next: (dataToken) => {
                  console.log('dataToken ', dataToken);
                  this.guardarAceptacionContrato();
                }, 
                error: (error) => {
                  console.error('Error en consultarTokenCodigoDactilar:', error);
                }
              });
            }, 
            error: (error) => {
              console.error('Error en consultarBuroCliente:', error);
            }
          });
        }, 
        error: (error) => {
          console.error('Error en consultarDatosCliente:', error);
        }
      });
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

  consultarDatosCliente(): Observable<any> {
    let body: DatosPersonalesRequest = { dni: this.form.get('cedula')?.value };
  
    return new Observable((observer) => {
      this.datosPersonalesService.consultarDatosClientes(body).subscribe({
        next: (data) => {
          if (data.success) {
            this.messageService.add({severity: 'info', detail: '¡Cliente ya existe. No puede continuar!'});
            observer.complete();
          } else {
            // this.messageService.add({severity: 'error', detail: data.data.message});
            observer.next(data);
          }
        },
        error: (error) => observer.error(error),
        complete: () => this.spinner = false
      });
    });
  }
  
  consultarBuroCliente(): Observable<any> {
    let body: ConsultarBuroClienteRequest = { identificationNumber: this.form.get('cedula')?.value };
  
    return new Observable((observer) => {
      this.datosPersonalesService.consultarBuroCliente(body).subscribe({
        next: (data) => {
          if (data.success) {
            if (data.data.score_v4 !== 'S/R') {
              observer.next(data);
            } else {
              this.messageService.add({severity: 'error', detail: '¡Cliente no tiene historial crediticio. No puede continuar!'});
              observer.complete();
            }
          } else {
            this.messageService.add({severity: 'error', detail: data.data});
            observer.complete();
          }
        },
        error: (error) => observer.error(error),
        complete: () => this.spinner = false
      });
    });
  }
  
  consultarTokenCodigoDactilar(data: any): Observable<any> {
    let body: TokenCodigoDactilarRequest = {
      customerName: data.data.customerName,
      customerUsername: data.data.customerName,
      fingerCode: this.form.get('codigoDactilar')?.value,
      identificationNumber: this.form.get('cedula')?.value,
    };

    this.customerName = data.data.customerName;
  
    return new Observable((observer) => {
      this.datosPersonalesService.consultarTokenCodigoDactilar(body).subscribe({
        next: (data) => {
          if (data.success) {
            this.fingerCode = data.message;
            observer.next(data);
            observer.complete();
          } else {
            this.messageService.add({severity: 'error', detail: '¡No se pudo obtener token de código dactilar. Intente nuevamente!'});
            // observer.next(data);
            observer.complete();
          }
        },
        error: (error) => observer.error(error),
        complete: () => this.spinner = false
      });
    });
  }

  guardarAceptacionContrato() {
    let body: AceptacionContratoRequest = {
      customer: {
        account: "",
        contract: "",
        direction: this.form.get('direccion')?.value,
        email: this.form.get('email')?.value,
        fingerCode: "74b0f248-7ea2-44c1-bd6c-53a0b72ea37f", //this.fingerCode
        identificationNumber: this.form.get('cedula')?.value,
        name: "GENESIS NARCISA", // this.separarNombre(this.customerName).nombres
        phone: this.form.get('celular')?.value,
        surname: "GAMBOA CEDEÑO", // this.separarNombre(this.customerName).apellidos
        transactionId: "48841",
        typeContract: "NUEVO",
        typeDoc: "500022"
      },
      otraOpeData: {
        emailRegion: "1",
        otrasOpeIntId: "",
        otrasOpeTvId: ""
      },
      payment: {
        card: "",
        costSuscription: "",
        descriptionSuscription: "",
        id: "500076",
        initialForm: "",
        method: "EF",
        provider: "",
        sucursalProvider: ""
      },
      productInt: {
        Aditional: "",
        AditionalPrice: "",
        id: "926",
        name: "Internet INT Premium 2:1",
        plan: "$5.27/mes"
      },
      productPhone: {
        id: "",
        name: "",
        plan: ""
      },
      productStrmg: {
        id: "",
        name: "",
        plan: ""
      },
      productTv: {
        decosAditional: "",
        id: "",
        name: "",
        packageAditional: "",
        packageAditionalPrice: "",
        plan: ""
      },
      promotionsInt: {
        disccount: "SIN PROMOCION",
        name: "PROMOCION RESIDENCIAL"
      },
      promotionsTv: {
        disccount: "",
        name: ""
      },
      vendor: {
        city: "Guayaquil",
        email: "dvillamar@tvcable.com.ec",
        name: "David Villamar"
      }
    };

    this.datosPersonalesService.guardarAceptacionContrato(body).subscribe({
      next: (data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('finger_code_uuid', data.finger_code_uuid);
          localStorage.setItem('url_biometria', data.url_biometria);
          localStorage.setItem('url_redirect', data.url_redirect);

          this.routerparams.navigate(['compra-en-linea/biometria-facial']);
        }
      },
      error: (error) => {
        this.messageService.add({severity: 'error', detail: '¡Ha ocurrido un error. Por favor intente nuevamente!'});
        console.log(error);
      }
    });
  }

  separarNombre(data: string) {
    const palabras = data.split(" ");
    const apellidos = palabras.slice(-2).join(" ");
    const nombres = palabras.slice(0, -2).join(" ");

    return {apellidos, nombres};
  }
}
