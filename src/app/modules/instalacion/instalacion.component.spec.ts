import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionComponent } from './instalacion.component';

describe('InstalacionComponent', () => {
  let component: InstalacionComponent;
  let fixture: ComponentFixture<InstalacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstalacionComponent]
    });
    fixture = TestBed.createComponent(InstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
