import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadComponent } from './tipo-actividad.component';

describe('TipoActividadComponent', () => {
  let component: TipoActividadComponent;
  let fixture: ComponentFixture<TipoActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoActividadComponent]
    });
    fixture = TestBed.createComponent(TipoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
