import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTimeChooserComponent } from './validation-time-chooser.component';

describe('ValidationTimeChooserComponent', () => {
  let component: ValidationTimeChooserComponent;
  let fixture: ComponentFixture<ValidationTimeChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationTimeChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationTimeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
