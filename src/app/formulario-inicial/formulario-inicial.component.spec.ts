import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInicialComponent } from './formulario-inicial.component';

describe('FormularioInicialComponent', () => {
  let component: FormularioInicialComponent;
  let fixture: ComponentFixture<FormularioInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
