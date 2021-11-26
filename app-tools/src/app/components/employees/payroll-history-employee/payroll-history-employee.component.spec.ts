import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollHistoryEmployeeComponent } from './payroll-history-employee.component';

describe('PayrollHistoryEmployeeComponent', () => {
  let component: PayrollHistoryEmployeeComponent;
  let fixture: ComponentFixture<PayrollHistoryEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollHistoryEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollHistoryEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
