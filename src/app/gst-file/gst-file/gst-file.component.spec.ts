import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstFileComponent } from './gst-file.component';

describe('GstFileComponent', () => {
  let component: GstFileComponent;
  let fixture: ComponentFixture<GstFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GstFileComponent]
    });
    fixture = TestBed.createComponent(GstFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
