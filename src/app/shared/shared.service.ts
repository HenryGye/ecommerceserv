import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private direccionSubject = new BehaviorSubject<string>('');
  private resultadoDireccionSubject = new BehaviorSubject<string>('');
  private timeLineDatosPersonales: boolean = false;
  private timeLineCobertura: boolean = false;
  private timeLineBiometriaFacial: boolean = false;
  private timeLineInstalacion: boolean = false;
  private timeLineActivo: boolean = false;
  private timeLineActivo1: boolean = false;
  private timeLineActivo2: boolean = false;
  private timeLineActivo3: boolean = false;
  private timeLineActivo4: boolean = false;

  setTimeLineDatosPersonales(value: boolean): void {
    this.timeLineDatosPersonales = value;
  }

  getTimeLineDatosPersonales(): boolean {
    return this.timeLineDatosPersonales;
  }

  setTimeLineCobertura(value: boolean): void {
    this.timeLineCobertura = value;
  }

  getTimeLineCobertura(): boolean {
    return this.timeLineCobertura;
  }

  setTimeLineBiometriaFacial(value: boolean): void {
    this.timeLineBiometriaFacial = value;
  }

  getTimeLineBiometriaFacial(): boolean {
    return this.timeLineBiometriaFacial;
  }

  setTimeLineInstalacion(value: boolean): void {
    this.timeLineInstalacion = value;
  }

  getTimeLineInstalacion(): boolean {
    return this.timeLineInstalacion;
  }

  setTimeLineActivo1(value: boolean): void {
    this.timeLineActivo1 = value;
  }

  getTimeLineActivo1(): boolean {
    return this.timeLineActivo1;
  }

  setTimeLineActivo2(value: boolean): void {
    this.timeLineActivo2 = value;
  }

  getTimeLineActivo2(): boolean {
    return this.timeLineActivo2;
  }

  setTimeLineActivo3(value: boolean): void {
    this.timeLineActivo3 = value;
  }

  getTimeLineActivo3(): boolean {
    return this.timeLineActivo3;
  }

  setTimeLineActivo4(value: boolean): void {
    this.timeLineActivo4 = value;
  }

  getTimeLineActivo4(): boolean {
    return this.timeLineActivo4;
  }

  setDireccion(direccion: string) {
    this.direccionSubject.next(direccion);
  }

  getDireccion(): Observable<string> {
    return this.direccionSubject.asObservable();
  }

  setResultadoDireccion(resultado: any) {
    this.resultadoDireccionSubject.next(resultado);
  }

  getResultadoDireccion(): Observable<any> {
    return this.resultadoDireccionSubject.asObservable();
  }
}
