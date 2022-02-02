import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRecordsComponent } from './individual-records.component';

describe('IndividualRecordsComponent', () => {
  let component: IndividualRecordsComponent;
  let fixture: ComponentFixture<IndividualRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
