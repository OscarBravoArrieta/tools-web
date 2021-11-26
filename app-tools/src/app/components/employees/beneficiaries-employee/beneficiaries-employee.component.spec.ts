import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesEmployeeComponent } from './beneficiaries-employee.component';

describe('BeneficiariesEmployeeComponent', () => {
  let component: BeneficiariesEmployeeComponent;
  let fixture: ComponentFixture<BeneficiariesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
