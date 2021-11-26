import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPageBeneficiariesComponent } from './tab-page-beneficiaries.component';

describe('TabPageBeneficiariesComponent', () => {
  let component: TabPageBeneficiariesComponent;
  let fixture: ComponentFixture<TabPageBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPageBeneficiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPageBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
