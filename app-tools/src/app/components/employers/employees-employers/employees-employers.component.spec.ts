import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEmployersComponent } from './employees-employers.component';

describe('EmployeesEmployersComponent', () => {
  let component: EmployeesEmployersComponent;
  let fixture: ComponentFixture<EmployeesEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
