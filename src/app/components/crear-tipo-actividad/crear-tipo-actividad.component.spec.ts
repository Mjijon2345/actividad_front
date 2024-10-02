import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoActividadComponent } from './crear-tipo-actividad.component';

describe('CrearTipoActividadComponent', () => {
  let component: CrearTipoActividadComponent;
  let fixture: ComponentFixture<CrearTipoActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTipoActividadComponent]
    });
    fixture = TestBed.createComponent(CrearTipoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
