import { Component } from '@angular/core';
import { Employer } from 'src/app/Employer.module';
import { Job } from 'src/app/Job.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-employeranalytics-component',
  templateUrl: './employeranalytics-component.component.html',
  styleUrls: ['./employeranalytics-component.component.css']
})
export class EmployeranalyticsComponentComponent {
  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
    this.getEmployers();
  }

  selectedEmployer: Employer | null = null;

  selectEmployer(employer: Employer): void {
    this.selectedEmployer = employer;
  }

  jobApplications: any[] = [];
  employers: Employer[] = [];
  showJobs: boolean = false;
  jobs: Job[] | null = null;

  jobId: number = 0;

  getApplications(jobId: number): void {
    this.adminService.getJobApplications(jobId).subscribe(
      (data: any[]) => {
        this.jobApplications = data;
      },
      (error: any) => { 
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
    this.adminService.getJobsByEmployer(employerId).subscribe(
      (jobs: Job[] | null) => { 
        if (jobs !== null) { 
          this.jobs = jobs;
          console.log(jobs);
        } else {
          this.jobs = [];
        }
      },
      (error: any) => { 
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
    this.adminService.reportJobSeeker(jobSeekerId).subscribe(
      () => {
        console.log('Job seeker reported successfully');
      },
      (error: any) => { 
        console.error('Error reporting job seeker:', error);
      }
    );
  }
}