import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GstFileComponent } from './gst-file/gst-file.component';
import { DownloadHistoryComponent } from './download-history/download-history.component';

const routes: Routes = [
  {path:'', component:GstFileComponent},
  { path: 'download-history', component: DownloadHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstFileRoutingModule { }
