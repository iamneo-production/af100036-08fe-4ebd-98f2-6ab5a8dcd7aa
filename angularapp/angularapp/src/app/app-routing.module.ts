import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EditemployerProfileComponent } from './employer-profile/editemployer-profile/editemployer-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {path: 'admin', component: AdminDashboardComponent },
    {path: 'search-jobs', component: JobSearchComponent, title:'Job Search Page'},
    { path: 'job-application', component: JobApplicationComponent },
    {path:'employerprofile',component:EmployerProfileComponent},
    {path:'editemployerprofile',component:EditemployerProfileComponent},


    {
    
      path: 'signup',
      component: SignupComponent,
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
      pathMatch: 'full',
  
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
 export const UserRoutingComponents=[
  JobSearchComponent
];

 

