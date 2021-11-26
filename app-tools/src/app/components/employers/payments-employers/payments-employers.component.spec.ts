import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsEmployersComponent } from './payments-employers.component';

describe('PaymentsEmployersComponent', () => {
  let component: PaymentsEmployersComponent;
  let fixture: ComponentFixture<PaymentsEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
