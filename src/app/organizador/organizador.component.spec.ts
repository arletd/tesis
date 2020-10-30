import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorComponent } from './organizador.component';

describe('OrganizadorComponent', () => {
  let component: OrganizadorComponent;
  let fixture: ComponentFixture<OrganizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
