import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmployeesComponent } from './grid-employees.component';

describe('GridEmployeesComponent', () => {
  let component: GridEmployeesComponent;
  let fixture: ComponentFixture<GridEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
