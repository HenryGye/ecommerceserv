import { TestBed } from '@angular/core/testing';

import { BiometriaFacialService } from './biometria-facial.service';

describe('BiometriaFacialService', () => {
  let service: BiometriaFacialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiometriaFacialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
