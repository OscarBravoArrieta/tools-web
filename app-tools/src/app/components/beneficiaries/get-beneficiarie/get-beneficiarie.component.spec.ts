import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBeneficiarieComponent } from './get-beneficiarie.component';

describe('GetBeneficiarieComponent', () => {
  let component: GetBeneficiarieComponent;
  let fixture: ComponentFixture<GetBeneficiarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBeneficiarieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBeneficiarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
