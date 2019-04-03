import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InverbsComponent } from './inverbs.component';

describe('InverbsComponent', () => {
  let component: InverbsComponent;
  let fixture: ComponentFixture<InverbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
