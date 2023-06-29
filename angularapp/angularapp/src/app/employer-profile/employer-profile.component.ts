import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {
  showEmployerUpdateForm: boolean = false;
  showUpdateEmployerForm(): void {
    this.showEmployerUpdateForm = true;
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
