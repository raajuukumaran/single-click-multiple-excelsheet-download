import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GstFileComponent } from './gst-file/gst-file/gst-file.component';

const routes: Routes = [
  {path:'', component:GstFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
