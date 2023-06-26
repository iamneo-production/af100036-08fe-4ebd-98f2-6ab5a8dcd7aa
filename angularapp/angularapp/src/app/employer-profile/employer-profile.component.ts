import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

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
    user: any = {};
   
    @Input() employeeId: number=3;
  
    
    constructor(private http: HttpClient) { }
    
    getUser(): void {
     const url = `https://8080-dfafedbbfdeabadfadacaeaebfceaeaadbdbabf.project.examly.io//employer/${this.employeeId}`;
     this.http.get(url)
       .subscribe(user => {
         console.log('User:', user);
         this.user=user;
       });
    }
  }
