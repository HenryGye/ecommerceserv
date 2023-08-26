export interface CoberturaRequest {
  latitude: string,
  longitude: string
}

export interface CoberturaResponse {
  city: string;
  cityId: number;
  nodes: NodeInfo[];
  province: string;
  provinceId: number;
  sector: string;
  sectorId: number;
  sectorType: string;
  sectorTypeId: number;
  subSector: string;
  subSectorId: number;
}

export interface NodeInfo {
  nodeName: string;
  technology: string;
}
