import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GstFileModule } from './gst-file/gst-file.module';
import { GstFileService } from './gst-file/gst-file.service';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';  // TabsModule import
import { ModalModule } from 'ngx-bootstrap/modal'; // ModalModule import

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GstFileModule,
    TabsModule.forRoot(),  // Initialize TabsModule
    ModalModule.forRoot(), // Initialize ModalModule
  ],
  providers: [GstFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
