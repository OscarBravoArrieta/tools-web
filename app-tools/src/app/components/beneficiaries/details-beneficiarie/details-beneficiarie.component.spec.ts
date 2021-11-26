import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBeneficiarieComponent } from './details-beneficiarie.component';

describe('DetailsBeneficiarieComponent', () => {
  let component: DetailsBeneficiarieComponent;
  let fixture: ComponentFixture<DetailsBeneficiarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBeneficiarieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBeneficiarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
