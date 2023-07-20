import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { SignupComponent } from './pages/signup/signup.component';

import { JobDetailsComponent } from './job-details/job-details.component';

import { JobSearchComponent } from './job-search/job-search.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
<<<<<<< HEAD
import { AddjobformComponentComponent } from './admin-dashboard/addjobform-component/addjobform-component.component';
import { JobseekerprofileComponent } from './jobseekerdetails/jobseekerprofile/jobseekerprofile.component';
import { JobseekerdashoardComponent } from './jobseekerdashoard/jobseekerdashoard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SigninComponent } from './pages/signin/signin.component';


=======
import { EditemployerProfileComponent } from './employer-profile/editemployer-profile/editemployer-profile.component';
>>>>>>> f9773027124a3873986f61435cd4f1cbd21527bd
const routes: Routes = [
    { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
    {path: 'admin', component: AdminDashboardComponent },
    { path: 'jobseekerdashboard', component: JobseekerdashoardComponent },
    { path: 'employerdashboard', component: EmployerDashboardComponent },
    { path: 'job-application', component: JobApplicationComponent },
<<<<<<< HEAD
    {path:'job-details',component:JobDetailsComponent},
    {path: 'job-serach',component:JobSearchComponent},
    {path:'jobseekerdetails',component:JobseekerprofileComponent},
    {path: 'landingpage', component: LandingpageComponent},
=======
    {path:'employerprofile',component:EmployerProfileComponent},
    {path:'editemployerprofile',component:EditemployerProfileComponent},

>>>>>>> f9773027124a3873986f61435cd4f1cbd21527bd

    {
      path: 'signup',
      component: SignupComponent,
      pathMatch: 'full',
    },
    {
      path: 'signin',
      component: SigninComponent,
      pathMatch: 'full',
  
    },

    {path:'employerprofile',component:EmployerProfileComponent},
 
    {path:'addjob',component:AddjobformComponentComponent}
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

 

