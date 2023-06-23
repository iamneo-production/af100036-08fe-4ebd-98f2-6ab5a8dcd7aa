import { Component, OnInit } from '@angular/core';
import { Job } from './job.module';
import { AdminDashboardService } from './admin-dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'job-portal-frontend';
  updatedJob: Job = {} as Job;
  showJobUpdateForm = false;
  deletedjobs: Job[] = [];
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  location: string="";
  jobType: string="";
  salary: number=0;
  sortBy: string=""; 
  constructor(private http: HttpClient,private adminService: AdminDashboardService) {}

  ngOnInit() {
    this.getAllDeletedJob();
    this.getJobs();
  }

  newJob: Job = {} as Job;

  
  



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
    let params = {};
  
    if (this.title && this.location) {
      params = { title: this.title, location: this.location };
    } else if (this.title) {
      params = { title: this.title };
    } else if (this.location) {
      params = { location: this.location };
    }
  
    this.http.get<Job[]>('http://localhost:8080/admins/jobs/search', { params })
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
    const sortByParam = this.sortBy.toLowerCase();
    const params = { sortBy: sortByParam };
  
    this.http.get<Job[]>('http://localhost:8080/admins/jobs/sort', { params })
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
    const url = `http://localhost:8080/admins/jobs/report/${jobId}`;
    
    this.http.post(url, {}, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Job reported successfully');
       
      },
      (error) => {
        console.error('Failed to report job:', error);
      }
    );
  }}
