import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employer } from 'src/app/Employer.module';
import { Job } from 'src/app/Job.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-addjobform-component',
  templateUrl: './addjobform-component.component.html',
  styleUrls: ['./addjobform-component.component.css']
})
export class AddjobformComponentComponent implements OnInit {
  @Output() showJobsForm = new EventEmitter<void>();
  jobs: Job[] = [];
  newJob: any = {};
  showsJobForm: boolean = false;
  @Input() queryParams: any;
  @Input() isAdminUser: boolean=false;
  existingEmployers: Employer[] = [];

  constructor(private adminService: AdminDashboardService,private router:Router,private route: ActivatedRoute)  {}

  ngOnInit() {
    console.log("add job", this.queryParams);
    this.route.queryParams.subscribe(params => {
      const employerId = params['employerId'];
      if (employerId) {
        this.newJob.employer = { id: employerId };
      }
    });
    
    this.getEmployers();
  }

  getEmployers() {
    this.adminService.getEmployers().subscribe(employers => {
      this.existingEmployers = employers;
    });
  }

  showJobSection(): void {
    this.showJobsForm.emit();
  }

  showJobForm(): void {
    this.showsJobForm = !this.showsJobForm;
  }
  addJob() {
    console.log(this.newJob)
    if (this.newJob && this.newJob.employer && this.newJob.employer.id) {
 
      const employerId = this.newJob.employer.id;
  
      const payload = {
        ...this.newJob,
        employer: {
          id: employerId
        }
      };
  
      this.adminService.addJob(payload).subscribe(createdJob => {
       
        alert('New Job Added');
        this.jobs.push(createdJob);
        this.newJob = {};
        this.showsJobForm = !this.showsJobForm;
        if(!this.isAdminUser)
        {
          const queryParams = {
            response: employerId
          };
      
          this.router.navigate(['/employerdashboard'], { queryParams });
        }
      });
    
  }
  }
  
}
