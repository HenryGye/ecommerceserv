export interface DatosPersonalesRequest {
  dni: string;
}

export interface DatosPersonalesResponse {
  calificacionBuro: string;
  carnetConadis: string | null;
  categoriaCuenta: string;
  celular: string;
  ciudad: string;
  contrato: number;
  conveniosPago: number;
  cuenta: number;
  direccion: string;
  email: string;
  estado: string;
  faseBajarCategoria: string | null;
  formaPago: string;
  identificacion: string;
  latitud: string;
  longitud: string;
  migracion: string | null;
  negocio: string;
  nodo: string;
  nombre: string;
  sistema: string;
  tecnologia: string;
  telefono: string;
  terceraEdad: string | null;
}

export interface TokenCodigoDactilarRequest {
  customerName: string;
  customerUsername: string;
  identificationNumber: string;
  fingerCode: string;
}

export interface ConsultaDirDicTitanRequest {
  id: string;
  tipo: string;
}