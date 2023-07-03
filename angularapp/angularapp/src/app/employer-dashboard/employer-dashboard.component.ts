import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';


import { Employer } from '../Employer.module';
import { AdminDashboardService } from '../admin-dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Job } from '../Job.module';


@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerPageComponent implements OnInit{
  
  queryParams:any;
  
  showApplications: boolean = false;
  employer:any;
employerId:number=0;
  constructor(private adminService: AdminDashboardService,private http: HttpClient,private route: ActivatedRoute) {
    
  }
  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      if (params['response']) {
        this.queryParams = JSON.parse(params['response']);
           this.employerId=   this.queryParams;        ;
        console.log(this.employerId);
      } else {
        console.log("Response parameter is missing.");
      }
    });
    this.getJobsByEmployer();
  
  }
  selectedEmployer: Employer | null = null;

  selectEmployer(employer: Employer): void {
    this.selectedEmployer = employer;
  }
 
  jobApplications:any=[];
  employers:Employer[]=[];
  showJobs:boolean=false;
  jobs:any=[];
  jobId:number=0;
  selectApplicant(applicationId: number) {
    this.http.post('http://localhost:8080/admins/selectApplicant', applicationId, { responseType: 'text' })
        .subscribe(
          (response: string) => {
            
            console.log(response);
          },
          (error) => {
          
            console.error(error);
          }
        );
    }
  

  getApplications(jobId: number): void {
  
    this.http.get<any[]>(`http://localhost:8080/admins/jobApplications/${jobId}`).subscribe(
      data => {
        this.jobApplications = data;
        this.showApplications=true;
      },
      error => {
        this.showApplications=true;
        console.log(error);
      }
    );
  }
  
   
    
    getJobsByEmployer() {

      this.http.get<Job[]>(`http://localhost:8080/admins/employers/${this.employerId}/jobs`).subscribe(
        (jobs: Job[]) => {
          if (jobs.length !== 0) {
            this.jobs = jobs;
            console.log(jobs);
          } else {
            this.jobs = [];
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    currentApplicationIndex: number = 0; 

    moveToNextApplication(): void {
      if (this.currentApplicationIndex < this.jobApplications.length - 1) {
        this.currentApplicationIndex++;
      }
    }
    moveToPreviousApplication(): void {
      if (this.currentApplicationIndex > 0) {
        this.currentApplicationIndex--;
      }
    }
    
  reportJobSeeker(jobSeekerId: number) {
    const endpoint = `http://localhost:8080/admins/job-seekers/report/${jobSeekerId}`;

    this.http.post(endpoint, {}, { responseType: 'text' }).subscribe(
      () => {
        console.log('Job seeker reported successfully');
       
      },
      (error) => {
        console.error('Error reporting job seeker:', error);
      
      }
    );
  }
  }