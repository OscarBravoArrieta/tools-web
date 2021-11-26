import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBeneficiariesComponent } from './grid-beneficiaries.component';

describe('GridBeneficiariesComponent', () => {
  let component: GridBeneficiariesComponent;
  let fixture: ComponentFixture<GridBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridBeneficiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
