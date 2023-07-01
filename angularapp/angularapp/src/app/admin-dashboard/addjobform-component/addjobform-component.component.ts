import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  existingEmployers: Employer[] = [];

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
    console.log("add job", this.queryParams);
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
    console.log('New Job:', this.newJob);
    const employerId = this.newJob.employer;
    const selectedEmployer = this.existingEmployers.find(employer => employer.id === employerId);
    if (selectedEmployer) {
      this.newJob.employer = selectedEmployer;
  
      this.adminService.addJob(this.newJob).subscribe(createdJob => {
        this.jobs.push(createdJob);
        this.newJob = {} as Job;
        this.showsJobForm = !this.showsJobForm;
      });
    }
  }
  
}
