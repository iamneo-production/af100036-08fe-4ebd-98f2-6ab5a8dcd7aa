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
export class EmployerDashboardComponent implements OnInit{
  
  queryParams:any;
  
  showApplications: boolean = false;
  employer:any;
employerId:number=0;
branch:string='';
baseURL:string='';
  constructor(private http: HttpClient,private route: ActivatedRoute) {
    const start = window.location.href.indexOf('-') + 1;
const end = window.location.href.indexOf('.project');
this.branch = window.location.href.substring(start, end);
this.baseURL = `https://8080-${this.branch}.project.examly.io`;
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
    this.http.post(`${this.baseURL}/dashboard/selectApplicant`, applicationId, { responseType: 'text' })
        .subscribe(
          (response: string) => {
            alert(response); 
            console.log(response);
          },
          (error) => {
          
            console.error(error);
          }
        );
    }
  

  getApplications(jobId: number): void {
  
    this.http.get<any[]>(`${this.baseURL}/dashboard/jobApplications/${jobId}`).subscribe(
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

      this.http.get<Job[]>(`${this.baseURL}/dashboard/employers/${this.employerId}/jobs`).subscribe(
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
    const endpoint = `${this.baseURL}/dashboard/job-seekers/report/${jobSeekerId}`;

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
