import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GstFileRoutingModule } from './gst-file-routing.module';
import { GstFileComponent } from './gst-file/gst-file.component';
import { DownloadHistoryComponent } from './download-history/download-history.component';


@NgModule({
  declarations: [
    GstFileComponent,
    DownloadHistoryComponent
  ],
  imports: [
    CommonModule,
    GstFileRoutingModule,
  ],
  providers: [DatePipe],
})
export class GstFileModule { }
