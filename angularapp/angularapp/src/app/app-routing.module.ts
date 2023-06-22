import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JobApplicationComponent } from './job-application/job-application.component';
const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {path: 'admin', component: AdminDashboardComponent },
  
    { path: 'job-application', component: JobApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }

 

