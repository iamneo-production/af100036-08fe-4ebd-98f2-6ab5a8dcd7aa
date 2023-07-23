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
  selectedImage!: File | null;
  profileImageUrl!: string | null;
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
  
      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          this.employerId = params['employerId'];
        });
        this.getUser();
        throw new Error('Method not implemented.');
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
