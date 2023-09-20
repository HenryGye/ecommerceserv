import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AceptacionContratoRequest } from '../datos-personales/datos-personales';

const API_KEY = environment.API_KEY; 
const API_MAIN = environment.MAIN_URL;
const API_ACEPTACION_CONTRATO = environment.API_ACEPTACION_CONTRATO;

@Injectable({
  providedIn: 'root'
})
export class BiometriaFacialService {

  constructor(private http: HttpClient) { }

  createHeader() {
    let headers: HttpHeaders;
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('api-key', API_KEY);
      return headers;
  }

  guardarAceptacionContrato(body: AceptacionContratoRequest){
    const headers = this.createHeader();
    return this.http.post<any>(`${API_MAIN + API_ACEPTACION_CONTRATO}`, body, { headers });
  }
}
