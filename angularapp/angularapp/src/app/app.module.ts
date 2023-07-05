import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddemployerformComponentComponent } from './admin-dashboard/addemployerform-component/addemployerform-component.component';

import { AddjobformComponentComponent } from './admin-dashboard/addjobform-component/addjobform-component.component';
import { AddjobseekerformComponentComponent } from './admin-dashboard/addjobseekerform-component/addjobseekerform-component.component';
import { CmsComponentComponent } from './admin-dashboard/cms-component/cms-component.component';
import { EmployeranalyticsComponentComponent } from './admin-dashboard/employeranalytics-component/employeranalytics-component.component';

import { JobcompoentComponentComponent } from './admin-dashboard/jobcompoent-component/jobcompoent-component.component';
import { JobseekercompoentComponentComponent } from './admin-dashboard/jobseekercompoent-component/jobseekercompoent-component.component';
import { EmployercomponentComponent } from './admin-dashboard/employercomponent/employercomponent.component';
import { FaqformComponentComponent } from './admin-dashboard/faqform-component/faqform-component.component';
import { SidebarComponentComponent } from './admin-dashboard/sidebar-component/sidebar-component.component';
import { TaskComponentComponent } from './admin-dashboard/task-component/task-component.component';

import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobseekerprofileComponent } from './jobseekerdetails/jobseekerprofile/jobseekerprofile.component';
import { JobseekereditprofileComponent } from './jobseekerdetails/jobseekereditprofile/jobseekereditprofile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
<<<<<<< HEAD
import { EmployerPageComponent } from './employer-dashboard/employer-dashboard.component';
=======
import { JobDetailsComponent } from './job-details/job-details.component';

>>>>>>> ef805b1a2678dd0db5de99f0246fe6b8834f9483


@NgModule({
  declarations: [
    AppComponent,
    AddjobformComponentComponent,
    CmsComponentComponent,
    EmployeranalyticsComponentComponent,
    JobcompoentComponentComponent,
    JobseekercompoentComponentComponent,
    AddjobseekerformComponentComponent,
    AddemployerformComponentComponent,
    AdminDashboardComponent,
    EmployercomponentComponent,
    FaqformComponentComponent,
    SidebarComponentComponent,
    TaskComponentComponent,
    TaskComponentComponent,
    JobApplicationComponent,
    JobseekerprofileComponent,
    JobseekereditprofileComponent,
    SignupComponent,
    LoginComponent,
<<<<<<< HEAD
    EmployerPageComponent
=======
    JobDetailsComponent
>>>>>>> ef805b1a2678dd0db5de99f0246fe6b8834f9483
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,    
    NgChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
