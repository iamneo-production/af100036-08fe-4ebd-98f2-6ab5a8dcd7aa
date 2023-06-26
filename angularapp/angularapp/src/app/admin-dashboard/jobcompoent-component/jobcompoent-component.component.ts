import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Employer } from 'src/app/Employer.module';
import { Job } from 'src/app/Job.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-jobcompoent-component',
  templateUrl: './jobcompoent-component.component.html',
  styleUrls: ['./jobcompoent-component.component.css']
})
export class JobcompoentComponentComponent implements OnInit {
  updatedJob: Job = {} as Job;
  isAccessedFromEmployer: boolean = false;
  showJobUpdateForm = false;
  deletedjobs: Job[] = [];
  jobs: Job[] = [];
  selectedJob: Job | null = null; 
  title: string="";
  location: string="";
  jobType: string="";
  salary: number=0;
  sortBy: string=""; 
  employer:Employer |null =null;
  constructor(private adminService: AdminDashboardService) {}
  @Input() employerId: number=0;
  ngOnInit() {
    this.getAllDeletedJob();
    this.getJobs();
  
  
    console.log(this.queryParams);
  }
  @Input() queryParams: any;
  newJob: Job = {} as Job;

  showJobDetails: boolean = false;
  showApplyForm: boolean = false;
  noJobsPosted = false;


 
  selectedJobId: number = 0;
  applyForJob(jobId: number): void {
    this.selectedJobId = jobId;
    this.showApplyForm=true;
    this.showJobDetails = false;
  }

  openJobDetails(jobId: number) {
    this.selectedJobId = jobId;
    this.showJobDetails = true;
    this.showApplyForm = false;

  }
 

  showUpdateJobForm(job: Job) {
    if (this.showJobUpdateForm && this.updatedJob.id === job.id) {
    
      this.showJobUpdateForm = false;
    } else {
   
      this.showJobUpdateForm = true;
      this.updatedJob = { ...job };
    }
  }

 
  getJobs() {
    this.adminService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
     
    });
  }

  getAllDeletedJob() {
    this.adminService.getAllDeletedJob().subscribe(deletedJobs => {
      this.deletedjobs = deletedJobs;
      console.log(deletedJobs);
    });
  }
  showDeletedJobs: boolean = false;
  toggleDeletedJobs() {
    this.showDeletedJobs = !this.showDeletedJobs;
  }

  deleteJob(id: number) {
    this.adminService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(job => job.id !== id);
    });
  }

  updateJob() {
    this.adminService.updateJob(this.updatedJob).subscribe(updatedJob => {
      const index = this.jobs.findIndex(j => j.id === updatedJob.id);
      if (index !== -1) {
        this.jobs[index] = updatedJob;
      }
      this.showJobUpdateForm = false;
    });
  }

  addJob() {
    this.adminService.addJob(this.newJob).subscribe(createdJob => {
      this.jobs.push(createdJob);
      this.newJob = {} as Job;
    });
  }
  
  searchJobs(): void {
    this.adminService.searchJobs(this.title, this.location)
      .subscribe(
        (data: Job[]) => {
          console.log(data);
          this.jobs = data; 
        },
        (error: any) => {
          console.error('An error occurred:', error);
        }
      );
  }
  
  sortJobs() {
    this.adminService.sortJobs(this.sortBy)
      .subscribe(
        (data: Job[]) => {
          console.log(data);
          this.jobs = data; 
        },
        (error: any) => {
          console.error('An error occurred:', error);
        }
      );
  }
  

  reportJob(jobId: number) {
    this.adminService.reportJob(jobId)
      .subscribe(
        () => {
          console.log('Job reported successfully');
        },
        (error) => {
          console.error('Failed to report job:', error);
        }
      );
  }}