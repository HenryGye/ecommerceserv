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

export interface ConsultarBuroClienteRequest {
  identificationNumber: string;
}

export interface ConsultarBuroClienteResponse {
  cards: Cards[];
  currentActiveCards: number;
  customerIdentificationNumber: string;
  customerIdentificationType: string;
  customerName: string;
  dateOfBirth: string;
  decision: string;
  incomeLevel: string;
  payment: number;
  politics: string;
  queryCode: number;
  registrationCard: string;
  result: string;
  score_v4: string;
  value: string;
}

export interface Cards {
  antiquity: number;
  averageBalance: number;
  currentBalance: number;
  institution: string;
  quota: number;
  totalCardUsage: number;
  totalDue: number;
  transmitter: string;
}

export interface AceptacionContratoRequest {
  customer: {
    account: string;
    contract: string;
    direction: string;
    email: string;
    fingerCode: string;
    identificationNumber: string;
    name: string;
    phone: string;
    surname: string;
    transactionId: string;
    typeContract: string;
    typeDoc: string;
  };
  otraOpeData: {
    emailRegion: string;
    otrasOpeIntId: string;
    otrasOpeTvId: string;
  };
  payment: {
    card: string;
    costSuscription: string;
    descriptionSuscription: string;
    id: string;
    initialForm: string;
    method: string;
    provider: string;
    sucursalProvider: string;
  };
  productInt: {
    Aditional: string;
    AditionalPrice: string;
    id: string;
    name: string;
    plan: string;
  };
  productPhone: {
    id: string;
    name: string;
    plan: string;
  };
  productStrmg: {
    id: string;
    name: string;
    plan: string;
  };
  productTv: {
    decosAditional: string;
    id: string;
    name: string;
    packageAditional: string;
    packageAditionalPrice: string;
    plan: string;
  };
  promotionsInt: {
    disccount: string;
    name: string;
  };
  promotionsTv: {
    disccount: string;
    name: string;
  };
  vendor: {
    city: string;
    email: string;
    name: string;
  };
}