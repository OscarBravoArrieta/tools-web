import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployerComponent } from './get-employer.component';

describe('GetEmployerComponent', () => {
  let component: GetEmployerComponent;
  let fixture: ComponentFixture<GetEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEmployerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
