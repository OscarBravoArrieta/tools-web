import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmployeesComponent } from './details-employees.component';

describe('DetailsEmployeesComponent', () => {
  let component: DetailsEmployeesComponent;
  let fixture: ComponentFixture<DetailsEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
