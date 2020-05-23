import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingsessionsComponent } from './coachingsessions.component';

describe('CoachingsessionsComponent', () => {
  let component: CoachingsessionsComponent;
  let fixture: ComponentFixture<CoachingsessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingsessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
