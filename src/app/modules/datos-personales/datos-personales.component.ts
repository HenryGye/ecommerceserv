import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Navigation, NavigationEnd } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form!: FormGroup;
  parametro: any;
  showImg: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private routerparams: Router,
    private elementRef: ElementRef) {
    this.initializeForm();
    this.sharedService.setTimeLineCobertura(true);
    this.sharedService.setTimeLineDatosPersonales(true);
    this.sharedService.setTimeLineActivo1(true);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('click');
    const img = document.getElementsByClassName('image-tooltip')[0];
    const imgSvg = document.getElementsByClassName('img-svg');
    if (event.target === imgSvg[0] || event.target === imgSvg[1]) {
      console.log('click2');
      this.showImg = !this.showImg;
      return;
    }
    
    if (event.target === img) {
      this.showImg = true;
    } else {
      this.showImg = false;
    }
  }

  public ngOnInit(): void {}

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
      console.log('click');
      this.routerparams.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.routerparams.navigate(['compra-en-linea/biometria-facial']);
      });
    }
  }
}
