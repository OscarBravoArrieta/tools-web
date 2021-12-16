import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTokenFromEmailComponent } from './verify-token-from-email.component';

describe('VerifyTokenFromEmailComponent', () => {
  let component: VerifyTokenFromEmailComponent;
  let fixture: ComponentFixture<VerifyTokenFromEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyTokenFromEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTokenFromEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
