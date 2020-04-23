import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOdersComponent } from './section-oders.component';

describe('SectionOdersComponent', () => {
  let component: SectionOdersComponent;
  let fixture: ComponentFixture<SectionOdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
