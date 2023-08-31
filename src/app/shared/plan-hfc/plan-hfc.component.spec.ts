import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHfcComponent } from './plan-hfc.component';

describe('PlanHfcComponent', () => {
  let component: PlanHfcComponent;
  let fixture: ComponentFixture<PlanHfcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanHfcComponent]
    });
    fixture = TestBed.createComponent(PlanHfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
