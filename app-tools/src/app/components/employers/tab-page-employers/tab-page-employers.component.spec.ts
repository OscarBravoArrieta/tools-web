import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPageEmployersComponent } from './tab-page-employers.component';

describe('TabPageEmployersComponent', () => {
  let component: TabPageEmployersComponent;
  let fixture: ComponentFixture<TabPageEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPageEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPageEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
