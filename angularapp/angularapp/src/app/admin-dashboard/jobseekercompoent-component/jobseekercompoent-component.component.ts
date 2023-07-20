import { Component, OnInit } from '@angular/core';
import { JobSeeker } from 'src/app/JobSeeker.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-jobseekercompoent-component',
  templateUrl: './jobseekercompoent-component.component.html',
  styleUrls: ['./jobseekercompoent-component.component.css']
})
export class JobseekercompoentComponentComponent implements OnInit {

  deletedJobSeekers: JobSeeker[] = [];
 
  jobSeekers: JobSeeker[] = [];
  
  newJobSeeker: JobSeeker = {} as JobSeeker;
  updatedJobSeeker: JobSeeker = {} as JobSeeker;
  

  showJobSeekerUpdateForm:boolean = false;


  constructor(private adminService: AdminDashboardService) {
    
  }
  ngOnInit() {
   
    this.getJobSeekers();

  }
 



  getAllDeletedJobSeekers() {
    this.adminService.getAllDeletedJobSeekers().subscribe(deletedJobseekers => {
      this.deletedJobSeekers = deletedJobseekers;
      console.log(deletedJobseekers);
      
    });
  }


  getJobSeekers() {
    this.adminService.getJobSeekers().subscribe(jobSeekers => {
      this.jobSeekers = jobSeekers;
    });
  }


  deleteJobSeeker(id: number) {
    this.adminService.deleteJobSeeker(id).subscribe(() => {
      this.jobSeekers = this.jobSeekers.filter(jobSeeker => jobSeeker.id !== id);
    });
  }

 

  updateJobSeeker() {
    this.adminService.updateJobSeeker(this.updatedJobSeeker).subscribe(updatedJobSeeker => {
      const index = this.jobSeekers.findIndex(js => js.id === updatedJobSeeker.id);
      if (index !== -1) {
        this.jobSeekers[index] = updatedJobSeeker;
      }
      this.showJobSeekerUpdateForm = false;
    });
  }

 
  addJobSeeker() {
    this.adminService.addJobSeeker(this.newJobSeeker).subscribe(createdJobSeeker => {
      this.jobSeekers.push(createdJobSeeker);
      this.newJobSeeker = {} as JobSeeker;
    });
  }

  showUpdateJobSeekerForm(jobSeeker: JobSeeker) {
    this.showJobSeekerUpdateForm = true;
    this.updatedJobSeeker = { ...jobSeeker };
  }
}  