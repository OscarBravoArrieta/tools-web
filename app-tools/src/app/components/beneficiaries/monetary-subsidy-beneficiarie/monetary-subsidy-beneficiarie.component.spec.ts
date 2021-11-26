import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetarySubsidyBeneficiarieComponent } from './monetary-subsidy-beneficiarie.component';

describe('MonetarySubsidyBeneficiarieComponent', () => {
  let component: MonetarySubsidyBeneficiarieComponent;
  let fixture: ComponentFixture<MonetarySubsidyBeneficiarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetarySubsidyBeneficiarieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetarySubsidyBeneficiarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
