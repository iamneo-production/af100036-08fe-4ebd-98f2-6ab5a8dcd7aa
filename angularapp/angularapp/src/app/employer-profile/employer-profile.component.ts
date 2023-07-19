import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent   implements OnInit{
  showEmployerUpdateForm: boolean = false;

  isFormVisible: boolean = false;
  selectedprofile:any;
  showUpdateEmployerForm(): void {
      this. showEmployerUpdateForm = true;
  
      this.isFormVisible = !this.isFormVisible;
    }
  
 @Input() isAdmin: boolean = true; 
  @Input() employerId: number=0;
  updateEmployer(updatedEmployer: any) {

    this.user = updatedEmployer;
  }
  
    selectimage($event: Event) {
    throw new Error('Method not implemented.');
    }
    upload() {
    throw new Error('Method not implemented.');
    }
      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          this.employerId = params['employerId'];
        });
        this.getUser();
        throw new Error('Method not implemented.');
      }
  user:any={};
    

      
      constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute) { }
      
      
      getUser(): void {
        const url = `https://8080-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io/employerdetails/${this.employerId}`;
        this.http.get(url).subscribe((employer) => {
          console.log(employer);
          this.user = employer; 
         

          this.selectedprofile = { ...this.user };
        });
      }
    
     
    
  
}
