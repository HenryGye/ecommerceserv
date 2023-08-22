import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometriaFacialComponent } from './biometria-facial.component';

describe('BiometriaFacialComponent', () => {
  let component: BiometriaFacialComponent;
  let fixture: ComponentFixture<BiometriaFacialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiometriaFacialComponent]
    });
    fixture = TestBed.createComponent(BiometriaFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
