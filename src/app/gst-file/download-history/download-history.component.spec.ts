import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadHistoryComponent } from './download-history.component';

describe('DownloadHistoryComponent', () => {
  let component: DownloadHistoryComponent;
  let fixture: ComponentFixture<DownloadHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadHistoryComponent]
    });
    fixture = TestBed.createComponent(DownloadHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
