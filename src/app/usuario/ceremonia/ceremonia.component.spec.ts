import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremoniaComponent } from './ceremonia.component';

describe('CeremoniaComponent', () => {
  let component: CeremoniaComponent;
  let fixture: ComponentFixture<CeremoniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeremoniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeremoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
