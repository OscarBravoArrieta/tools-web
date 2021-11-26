import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPageEmployeesComponent } from './tab-page-employees.component';

describe('TabPageEmployeesComponent', () => {
  let component: TabPageEmployeesComponent;
  let fixture: ComponentFixture<TabPageEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPageEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPageEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
