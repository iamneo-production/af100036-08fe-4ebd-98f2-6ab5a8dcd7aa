import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Employer } from 'src/app/Employer.module';
import { Job } from 'src/app/Job.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-employercomponent',
  templateUrl: './employercomponent.component.html',
  styleUrls: ['./employercomponent.component.css']
})
export class EmployercomponentComponent implements OnInit {
  showSection: string | null = null;
  updatedEmployer: Employer = {} as Employer;

  showEmployerUpdateForm = false;
  showJobSeekerUpdateForm = false;
  showJobUpdateForm = false;
  @Input() queryParams: any;
  employers: Employer[] = [];
 
  deletedEmployer: Employer[] = [];
  jobs: Job[] | null = null;
  employerId: number = 0;
  
  newEmployer: Employer = {} as Employer;

  showEmployerForm: boolean = false;
  isSidebarOpen: boolean = false;
  showEmployersDetails: boolean = true;
  
  selectedEmployerId: number = 0;

  
  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
 
    this.getEmployers();

    
    this.getAllDeletedEmployers();
  
  }
  
  getEmployers() {
    this.adminService.getEmployers().subscribe(employers => {
      this.employers = employers;
     
    });
  }
  
 
  getJobsByEmployer() {
    this.adminService.getJobsByEmployer(this.employerId).subscribe(
      (jobs: Job[] | null) => {
        this.jobs = jobs;
      },
      (error) => {
        console.log('Error occurred while fetching jobs:', error);
      }
    );
  }
 
  openEmployerDetails(employerId: number) {
    console.log(employerId);
    this.selectedEmployerId = employerId;
    this.showEmployersDetails = true;
  }
  

  getAllDeletedEmployers() {
    this.adminService.getAllDeletedEmployers().subscribe(DeletedEmployer => {
      this.deletedEmployer = DeletedEmployer;
    });
  }

  deleteEmployer(id: number) {
    this.adminService.deleteEmployer(id).subscribe(() => {
      this.employers = this.employers.filter(employer => employer.id !== id);
    });
  }


  updateEmployer() {
    this.adminService.updateEmployer(this.updatedEmployer).subscribe(updatedEmployer => {
      const index = this.employers.findIndex(e => e.id === updatedEmployer.id);
      if (index !== -1) {
        this.employers[index] = updatedEmployer;
      }
      this.showEmployerUpdateForm = false;
    });
  }



  addEmployer() {
    this.adminService.addEmployer(this.newEmployer).subscribe(createdEmployer => {
      this.employers.push(createdEmployer);
      this.newEmployer = {} as Employer;
      this.showEmployerForm = false;
    });
  }



  showUpdateEmployerForm(employer: Employer) {
    this.showEmployerUpdateForm = true;
    this.updatedEmployer = { ...employer };
  }



  showAddEmployerForm() {
    this.showEmployerForm = true;
  }

  
}  