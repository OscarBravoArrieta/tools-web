import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmployersComponent } from './grid-employers.component';

describe('GridEmployersComponent', () => {
  let component: GridEmployersComponent;
  let fixture: ComponentFixture<GridEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
