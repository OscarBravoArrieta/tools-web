import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusEmployersComponent } from './update-status-employers.component';

describe('UpdateStatusEmployersComponent', () => {
  let component: UpdateStatusEmployersComponent;
  let fixture: ComponentFixture<UpdateStatusEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStatusEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
