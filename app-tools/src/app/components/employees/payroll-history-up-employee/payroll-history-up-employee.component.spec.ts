import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollHistoryUpEmployeeComponent } from './payroll-history-up-employee.component';

describe('PayrollHistoryUpEmployeeComponent', () => {
  let component: PayrollHistoryUpEmployeeComponent;
  let fixture: ComponentFixture<PayrollHistoryUpEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollHistoryUpEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollHistoryUpEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
