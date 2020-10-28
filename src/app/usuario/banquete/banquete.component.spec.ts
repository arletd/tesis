import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueteComponent } from './banquete.component';

describe('BanqueteComponent', () => {
  let component: BanqueteComponent;
  let fixture: ComponentFixture<BanqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
