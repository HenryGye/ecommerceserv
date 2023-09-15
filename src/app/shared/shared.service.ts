import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private direccionSubject = new Subject<string>();
  private prediccionSubject = new Subject<string>();
  private resultadoDireccionSubject = new Subject<any>();
  private resultadoPrediccionSubject = new Subject<any>();
  private stepStatusChangedSource = new Subject<void>();
  stepStatusChanged = this.stepStatusChangedSource.asObservable();
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
    this.stepStatusChangedSource.next();
  }

  getTimeLineDatosPersonales(): boolean {
    return this.timeLineDatosPersonales;
  }

  setTimeLineCobertura(value: boolean): void {
    this.timeLineCobertura = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineCobertura(): boolean {
    return this.timeLineCobertura;
  }

  setTimeLineBiometriaFacial(value: boolean): void {
    this.timeLineBiometriaFacial = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineBiometriaFacial(): boolean {
    return this.timeLineBiometriaFacial;
  }

  setTimeLineInstalacion(value: boolean): void {
    this.timeLineInstalacion = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineInstalacion(): boolean {
    return this.timeLineInstalacion;
  }

  setTimeLineActivo1(value: boolean): void {
    this.timeLineActivo1 = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineActivo1(): boolean {
    return this.timeLineActivo1;
  }

  setTimeLineActivo2(value: boolean): void {
    this.timeLineActivo2 = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineActivo2(): boolean {
    return this.timeLineActivo2;
  }

  setTimeLineActivo3(value: boolean): void {
    this.timeLineActivo3 = value;
    this.stepStatusChangedSource.next();
  }

  getTimeLineActivo3(): boolean {
    return this.timeLineActivo3;
  }

  setTimeLineActivo4(value: boolean): void {
    this.timeLineActivo4 = value;
    this.stepStatusChangedSource.next();
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

  setPrediccion(direccion: string) {
    this.prediccionSubject.next(direccion);
  }

  getPrediccion(): Observable<string> {
    return this.prediccionSubject.asObservable();
  }

  setResultadoPrediccion(resultado: any) {
    this.resultadoPrediccionSubject.next(resultado);
  }

  getResultadoPrediccion(): Observable<any> {
    return this.resultadoPrediccionSubject.asObservable();
  }
}
