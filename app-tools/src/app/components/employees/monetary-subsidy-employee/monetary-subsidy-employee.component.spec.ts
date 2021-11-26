import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetarySubsidyEmployeeComponent } from './monetary-subsidy-employee.component';

describe('MonetarySubsidyEmployeeComponent', () => {
  let component: MonetarySubsidyEmployeeComponent;
  let fixture: ComponentFixture<MonetarySubsidyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetarySubsidyEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetarySubsidyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
