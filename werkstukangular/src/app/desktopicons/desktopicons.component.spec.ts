import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopiconsComponent } from './desktopicons.component';

describe('DesktopiconsComponent', () => {
  let component: DesktopiconsComponent;
  let fixture: ComponentFixture<DesktopiconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopiconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
