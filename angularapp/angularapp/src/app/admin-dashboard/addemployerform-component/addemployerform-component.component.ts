import { Component } from '@angular/core';
import { Employer } from 'src/app/Employer.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-addemployerform-component',
  templateUrl: './addemployerform-component.component.html',
  styleUrls: ['./addemployerform-component.component.css']
})
export class AddemployerformComponentComponent {
  employer: Employer[] = [];
  newEmployer: Employer = {} as Employer;
  showsEmployerForm: boolean = false;
  
  @Input() queryParams: any;
  constructor(private adminService: AdminDashboardService) {
    
  }
  ngOnInit() {
  
  
  }
  showEmployerForm(){
    this.showsEmployerForm =true;
  }
  addEmployer() {
    this.adminService.addEmployer(this.newEmployer).subscribe(createdemployer => {
      this.employer.push(createdemployer );
      this.newEmployer = {} as Employer;
    this.showsEmployerForm =!this.showsEmployerForm;
    });
  }
  
  }

function Input(): (target: AddemployerformComponentComponent, propertyKey: "queryParams") => void {
  throw new Error('Function not implemented.');
}
