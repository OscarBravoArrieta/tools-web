import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesEmployersComponent } from './beneficiaries-employers.component';

describe('BeneficiariesEmployersComponent', () => {
  let component: BeneficiariesEmployersComponent;
  let fixture: ComponentFixture<BeneficiariesEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
