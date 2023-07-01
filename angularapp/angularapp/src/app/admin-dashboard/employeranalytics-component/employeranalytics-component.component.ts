import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employer } from 'src/app/Employer.module';
import { Job } from 'src/app/Job.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-employeranalytics-component',
  templateUrl: './employeranalytics-component.component.html',
  styleUrls: ['./employeranalytics-component.component.css']
})
export class EmployeranalyticsComponentComponent 
{
constructor(private adminService: AdminDashboardService,private http: HttpClient) {
  
}
ngOnInit() {
  
  this.getEmployers();

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
getApplications(jobId: number): void {
  this.http.get<any[]>(`http://localhost:8080/admins/jobApplications/${jobId}`).subscribe(
    data => {
      this.jobApplications = data;
    },
    error => {
      console.log(error);
    }
  );
}

  getEmployers() {
    this.adminService.getEmployers().subscribe(employers => {
      this.employers = employers;
       console.log(employers);
     
    });
  }
  getJobsByEmployer(employerId: number) {
    this.showJobs = true;
    this.http.get<Job[]>(`http://localhost:8080/admins/employers/${employerId}/jobs`).subscribe(
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