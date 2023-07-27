import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import { ActivatedRoute, Router } from '@angular/router';
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
<<<<<<< HEAD
export class EmployerProfileComponent implements OnInit {
  showEmployerUpdateForm: boolean = false;
  showUpdateEmployerForm(): void {
    this.showEmployerUpdateForm = true;
  }
=======
export class EmployerProfileComponent   implements OnInit{
  showEmployerUpdateForm: boolean = false;
  isFormVisible: boolean = false;
  selectedprofile:any;
  showUpdateEmployerForm(): void {
      this. showEmployerUpdateForm = true;
  
      this.isFormVisible = !this.isFormVisible;
    }
  
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
 @Input() isAdmin: boolean = true; 
  @Input() employerId: number=0;
  updateEmployer(updatedEmployer: any) {

    this.user = updatedEmployer;
  }
<<<<<<< HEAD
    selectimage($event: Event) {
    throw new Error('Method not implemented.');
    }
    upload() {
    throw new Error('Method not implemented.');
    }
      ngOnInit(): void {
        this.getUser();
        throw new Error('Method not implemented.');
      }
  user:any={};
    

      
      constructor(private http: HttpClient,private router:Router) { }
      
      
      getUser(): void {
        const url = `http://localhost:8080/admins/employers/${this.employerId}`;
        this.http.get(url).subscribe((employer) => {
          console.log(employer);
          this.user = employer; 
        });
      }
  }
=======
  
      ngOnInit(): void {
      
        this.route.queryParams.subscribe(params => {
          const employerId = params['employerId'];
          if (employerId) {
            this.employerId  = employerId ;
          }
        });
        this.getUser();
      }
  user:any={};
    
branch:string='';
baseURL:string='';
      
      constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute) {
        const start = window.location.href.indexOf('-') + 1;
const end = window.location.href.indexOf('.project');
this.branch = window.location.href.substring(start, end);
this.baseURL = `https://8080-${this.branch}.project.examly.io`;
      }
      
      
      getUser(): void {
        const url = `${this.baseURL}/employerdetails/${this.employerId}`;
        this.http.get(url).subscribe((employer) => {
          console.log(employer);
          this.user = employer; 
         

          this.selectedprofile = { ...this.user };
        });
      }
    
     
    
  
}
>>>>>>> bdf533daf0e7ef2426dadc0c36ec6908affbeeb1
