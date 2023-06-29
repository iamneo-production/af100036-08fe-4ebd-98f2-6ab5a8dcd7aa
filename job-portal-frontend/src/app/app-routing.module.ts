import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSearchComponent } from './job-search/job-search.component';
const routes: Routes = [
  {path: '', component: JobSearchComponent, title:'Job Search Page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const UserRoutingComponents=[
  JobSearchComponent
];
