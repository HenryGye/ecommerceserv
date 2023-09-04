import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CoberturaRequest, CoberturaResponse } from './cobertura';
import { Result } from 'src/app/interfaces/result';

const API_KEY = environment.API_KEY; 
const API_MAIN = environment.MAIN_URL;
const API_CONSULTAR_COBERTURA = environment.API_CONSULTAR_COBERTURA;

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor(private http: HttpClient) {}

  createHeader() {
    let headers: HttpHeaders;
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('api-key', API_KEY);
      return headers;
  }

  consultarCobertura(body: CoberturaRequest){
    const headers = this.createHeader();
    return this.http.post<Result<CoberturaResponse>>(`${API_MAIN + API_CONSULTAR_COBERTURA}`, body, { headers });
  }
}
