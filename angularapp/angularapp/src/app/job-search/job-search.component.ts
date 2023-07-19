import { Component,Input,OnInit} from '@angular/core';
import { Job } from '../Job.module';
import { Employer } from '../Employer.module';
import { AdminDashboardService } from '../admin-dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JobServiceService } from '../job-service.service';
@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
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
  constructor(private http: HttpClient,private jobService: JobServiceService,private route: ActivatedRoute)  {}
  @Input() jobSeekerId:number=0;
  ngOnInit() {
 

    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.jobSeekerId = params['jobSeekerId'] || 0;
      console.log(this.jobSeekerId);
      this.getAllDeletedJob();
      this.getJobs();
      
    })
  }
 queryParams: any;
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
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      console.log(this.jobs);
    });
    console.log(this.jobs);
  }

  getAllDeletedJob() {
    this.jobService.getAllDeletedJob().subscribe(deletedJobs => {
      this.deletedjobs = deletedJobs;
      console.log(deletedJobs);
    });
  }
  showDeletedJobs: boolean = false;
  toggleDeletedJobs() {
    this.showDeletedJobs = !this.showDeletedJobs;
  }
  searchJobs(): void {
    this.jobService.searchJobs(this.title, this.location)
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
    this.jobService.sortJobs(this.sortBy)
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
    this.jobService.reportJob(jobId)
      .subscribe(
        () => {
          console.log('Job reported successfully');
  
        },
        (error: any) => {
          console.error('Failed to report job:', error);
        }
      );
  }
  }
