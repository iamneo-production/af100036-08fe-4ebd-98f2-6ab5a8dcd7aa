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
    FaqformComponentComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
