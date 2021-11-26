import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployerComponent } from './payroll-employer.component';

describe('PayrollEmployerComponent', () => {
  let component: PayrollEmployerComponent;
  let fixture: ComponentFixture<PayrollEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollEmployerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
