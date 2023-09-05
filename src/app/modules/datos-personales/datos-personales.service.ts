import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ConsultarBuroClienteRequest, DatosPersonalesRequest, DatosPersonalesResponse, TokenCodigoDactilarRequest } from './datos-personales';
import { Result } from 'src/app/interfaces/result';

const API_KEY = environment.API_KEY; 
const API_MAIN = environment.MAIN_URL;
const API_CONSULTAR_DATOS_CLIENTE = environment.API_CONSULTAR_DATOS_CLIENTE;
const API_CONSULTAR_CALLE_PRINCIPAL_SECUNDARIA = environment.API_CONSULTAR_CALLE_PRINCIPAL_SECUNDARIA;
const API_CONSULTAR_TOKEN_CODIGO_DACTILAR = environment.API_CONSULTAR_TOKEN_CODIGO_DACTILAR;
const API_CONSULTAR_BURO_CLIENTE = environment.API_CONSULTAR_BURO_CLIENTE;

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

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

  consultarDatosClientes(body: DatosPersonalesRequest){
    const headers = this.createHeader();
    return this.http.post<Result<any>>(`${API_MAIN + API_CONSULTAR_DATOS_CLIENTE}`, body, { headers });
  }

  consultarCallePrincipalSecundaria(body: any){
    const headers = this.createHeader();
    return this.http.post<any>(`${API_MAIN + API_CONSULTAR_CALLE_PRINCIPAL_SECUNDARIA}`, body, { headers });
  }

  consultarTokenCodigoDactilar(body: TokenCodigoDactilarRequest){
    const headers = this.createHeader();
    return this.http.post<Result<any>>(`${API_MAIN + API_CONSULTAR_TOKEN_CODIGO_DACTILAR}`, body, { headers });
  }

  consultarBuroCliente(body: ConsultarBuroClienteRequest){
    const headers = this.createHeader();
    return this.http.post<Result<any>>(`${API_MAIN + API_CONSULTAR_BURO_CLIENTE}`, body, { headers });
  }
}
