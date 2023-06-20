import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from '../Employer.module';
import { Faq } from '../Faq.module';
import { Job } from '../Job.module';
import { JobSeeker } from '../JobSeeker.module';
import { AdminDashboardService } from '../admin-dashboard.service';
import { ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showSection: string | null = null;
  showfaq: boolean = false;
  deletedjobs: Job[] = [];
  deletedJobSeekers: JobSeeker[] = [];
  jobs: Job[] = [];
  employers: Employer[] = [];
  jobSeekers: JobSeeker[] = [];
  deletedEmployer: any[] = [];
  showTask: boolean = true;
  showReportedJobs: boolean = false;
  showReportedEmployers: boolean = false;
  showReportedJobSeekers: boolean = false;
  showEmployersAnalyticsPage:boolean=false;
  showsJobForm: boolean = false;
  jobChartData: number[] = [];
  reportedJobs: any[]=[];
  jobchartLabels: string[] = ['ActiveJobs', 'ExpiredJobs'];
  jobchartmonthsLabels: string[] = [];
  jobChartmonthsData: number[] = [];
  employerchartLabels: string[] = ['ActiveEmployers', 'DeletedEmployers'];
  jobseekerschartLabels: string[] = ['ActiveJobSeekers', 'DeletedJobSeekers'];
  chartOptions: any = {
    responsive: true,
    elements: {
      line: {
        borderColor: 'red'
      },
    },
  };
  chartType: ChartType = 'doughnut';
  showChart: boolean = true;
  
  faqs: Faq[]=[];
  showEmployerForm: boolean = false;
  showJobSeekerForm:boolean =false;
  isSidebarOpen: boolean = false;

  chartTypes: ChartType = 'line';
  jobSeekerId: string="";
  employerId: string="";
  queryParams: any;

  constructor(private adminService: AdminDashboardService,private http: HttpClient,private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    this.getAllDeletedJob();
    this.getJobs();
    this.getEmployers();
    this.getJobSeekers();
   this.getAllDeletedJobSeekers();
    this.getAllDeletedEmployers(); 
   
  }
  showAddPostForm: boolean = false;
  openAddContentForm() {
    this.showAddPostForm = !this.showAddPostForm;
  }
  showJobForm(): void {
    this.showReportedJobs = false;
  
    this.showsJobForm = !this.showsJobForm;
 

  }

  fileToUpload: File | null = null;
  title = '';
  content = '';
  selectedPostImage: string | null = null;
  newPost:any={};
  uploadFile(event: any) {
    
    const file = event.target.files[0];
    this.fileToUpload = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedPostImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  addPost() {
    const formData: FormData = new FormData();
    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }
    formData.append('title', this.newPost.title);
    formData.append('content', this.newPost.content);
  
    const addUrl = 'http://localhost:8080/admins/cms/upload';
    this.http.post(addUrl, formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Post added successfully');
        this.clearForm();
      },
      (error) => {
        console.log('Error occurred while adding post:', error);
      }
    
    
    );
  }
  
  clearForm() {
    this.fileToUpload = null;
    this.newPost.title = ''; 
    this.newPost.content = ''; 
  }
  

showEmployerAnalytics():void{
  this.showEmployersAnalyticsPage=!this.showEmployersAnalyticsPage;
     
  this.showReportedEmployers=false;
  this.showEmployerForm=false;
  
   
  }
showsEmployerForm():void{

  this.showEmployerForm=!this.showEmployerForm;
  this.showReportedJobs=false;
 
  this.showReportedEmployers=false;
}

loadReportedJobs() {
  const url = 'http://localhost:8080/admins/reported/employers';

  this.http.get<any[]>(url).subscribe(
    (jobs) => {
      this.reportedJobs = jobs;
      this.showReportedJobs =true;
      this. showReportedJobSeekers=false;
     this.showsJobForm=false;
    },
    (error) => {
      console.error('Failed to load reported jobs:', error);
    }
  );
}
loadReportedEmployers() {
  const url = 'http://localhost:8080/admins/reported/employers';

  this.http.get<any[]>(url).subscribe(
    (jobs) => {
      this.reportedJobs = jobs;
      this.showEmployerForm=false;
      this.showEmployersAnalyticsPage=false;

      this.showReportedEmployers=true;
    },
    (error) => {
      console.error('Failed to load reported jobs:', error);
    }
  );
}
showFaq():void{
  this.showfaq=!this.showfaq;
  this.showAddPostForm = false;
}
showsJobSeekerForm():void
{
  
  this.showReportedJobSeekers=false;
  this.showJobSeekerForm=!this.showJobSeekerForm;
}
  getJobs() {
    this.adminService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.jobChartData = [
        jobs.length, 
        this.deletedjobs.length 
      ];
      
      
        
        const jobCounts: { [month: string]: number } = {};
  
        for (const job of jobs) {
          const createdDate = new Date(job.createdAt);
          const monthYear = formatDate(createdDate, 'MMM yyyy', 'en-US');
  
          if (jobCounts[monthYear]) {
            jobCounts[monthYear]++;
          } else {
            jobCounts[monthYear] = 1;
          }
        }
  
      
        const months = Object.keys(jobCounts);
        const jobData = Object.values(jobCounts);
  
   
        this.jobchartmonthsLabels = months;
        this.jobChartmonthsData = jobData;
   
      });
      
   
  }

    getEmployers() {
      this.adminService.getEmployers().subscribe(
        (employers: Employer[] | null) => {
          if (employers) {
            this.employers = employers;
            for (const employer of this.employers) {
              this.adminService.getJobsByEmployer(employer.id).subscribe(jobs => {
                if(jobs!=null)
                employer.jobs = jobs;
              });
            }
          }
        },
        (error) => {
          console.error('Failed to retrieve employers:', error);
        }
      );
    }
    

  getAllDeletedJob() {
    this.adminService.getAllDeletedJob().subscribe(deletedJobs => {
      this.deletedjobs = deletedJobs;
      console.log(deletedJobs);
    });
  }

  getAllDeletedJobSeekers() {
    this.adminService.getAllDeletedJobSeekers().subscribe(deletedJobseekers => {
      this.deletedJobSeekers = deletedJobseekers;
      console.log(deletedJobseekers);
      
    });
  }

  getAllDeletedEmployers() {
    this.adminService.getAllDeletedEmployers().subscribe(DeletedEmployer => {
      this.deletedEmployer = DeletedEmployer;
      console.log(this.deletedEmployer);
    });
  }
  getJobSeekers() {
    this.adminService.getJobSeekers().subscribe(jobSeekers => {
      this.jobSeekers = jobSeekers;
    });
  }

  toggleSidebar(event: Event) {
    const targetElement = event.target as Element;
    
    if (this.isSidebarOpen && targetElement.classList.contains('fa-bars')) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }
  
  
  deleteJob(id: number) {
    this.adminService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(job => job.id !== id);
      this.loadReportedJobs();
    });
  }
 
 
  toggleSection(section: string): void {
    
      if (this.showSection === section) {
        this.showEmployersAnalyticsPage=false;
        this.showSection = null;
        this.showsJobForm = false;
        this.showEmployerForm = false;
        this.showChart = section !== 'charts';
        this.showfaq = false;
        this.showAddPostForm = false;
        this.showTask = section !== 'task';
       this.showJobSeekerForm=false;
          this.showReportedJobs = false;
    this. showReportedJobSeekers=false;
    this.showsJobForm=false;
  this.showReportedEmployers=false;
        
      } else {
        this.showAddPostForm = false;
        this.showsJobForm=false;
        this. showReportedJobSeekers=false;
        this.showJobSeekerForm=false;
        this.showEmployersAnalyticsPage=false;
        this.showSection = section;
        this.showsJobForm = false;
        this.showEmployerForm = false;
        this.showChart = false;
        this.showTask = false;
        this.showfaq = false;
       
        this.showReportedJobs=false;
        this.showReportedEmployers=false;
        
      }
    
  }
  getAllFAQs() {
    this.http.get<Faq[]>('http://localhost:8080/admins/faq').subscribe(
      data => {
        this.faqs = data;
      },
      error => {
        console.log('An error occurred while retrieving FAQs:', error);
      }
    );
}  


unreportJob(job: any) {
  this.http.post(`http://localhost:8080/admins/jobs/unreport/${job.id}`, {}, { responseType: 'text' }).subscribe(
    () => {
      console.log('Job unreported successfully');
     
      this.loadReportedJobs();
   
  
    },
    (error) => {
      console.error('Failed to unreport job:', error);
    }
  );
}
unreportEmployer(job: any) {
  this.http.post(`http://localhost:8080/admins/jobs/unreport/${job.id}`, {}, { responseType: 'text' }).subscribe(
    () => {
      console.log('Job unreported successfully');
     
      
   
      this.loadReportedEmployers();
    },
    (error) => {
      console.error('Failed to unreport job:', error);
    }
  );
}
deleteEmployer(id: number) {
  this.adminService.deleteEmployer(id).subscribe(() => {
    this.employers = this.employers.filter(employer => employer.id !== id);
  
    this.loadReportedJobs();
  });
}
deleteJobSeeker(id: number) {
  this.adminService.deleteJobSeeker(id).subscribe(() => {
    this.jobSeekers = this.jobSeekers.filter(jobSeeker => jobSeeker.id !== id);
  });
}
reportedJobSeekers: JobSeeker[] = [];

  loadReportedJobSeekers() {
    const url = 'http://localhost:8080/admins/reported/jobseekers';

    this.http.get<JobSeeker[]>(url).subscribe(
      (jobSeekers) => {
        this.reportedJobSeekers = jobSeekers;
        this.showReportedJobSeekers = true;
this.showJobSeekerForm=false;

      },
      (error) => {
        console.error('Failed to load reported job seekers:', error);
      }
    );
  }

  unreportJobSeeker(jobSeeker: JobSeeker) {
    const url = `http://localhost:8080/admins/job-seekers/unreport/${jobSeeker.id}`;

    this.http.post(url, {}, { responseType: 'text' }).subscribe(
      () => {
        console.log('Job seeker unreported successfully');
        this.loadReportedJobSeekers();
      },
      (error) => {
        console.error('Failed to unreport job seeker:', error);
      }
    );
  }

}