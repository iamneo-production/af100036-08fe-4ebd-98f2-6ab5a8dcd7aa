import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employer } from 'src/app/Employer.module';

@Component({
  selector: 'app-editemployer-profile',
  templateUrl: './editemployer-profile.component.html',
  styleUrls: ['./editemployer-profile.component.css']
})
export class EditemployerProfileComponent implements OnInit {
  @Input() employerId: number = 0;
  updatedEmployer:any={};
  @Input () input:any={};
  @Input()isFormVisible: boolean = true;
    @Output() employerUpdated: EventEmitter<any> = new EventEmitter<any>();
    @Output() isFormVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
branch:string='';
baseURL:string='';
  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) {
    const start = window.location.href.indexOf('-') + 1;
const end = window.location.href.indexOf('.project');
this.branch = window.location.href.substring(start, end);
this.baseURL = `https://8080-${this.branch}.project.examly.io`;
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employerId = params['employerId'];
    });
    this.updatedEmployer=this.input;
  }
  upload() {
    const url = `${this.baseURL}/employerdetails/${this.employerId}`;
    this.http.put<Employer>(url, this.updatedEmployer).subscribe(
      (response) => {
        this.isFormVisible = false;
        this.isFormVisibleChange.emit(this.isFormVisible);
        this.employerUpdated.emit(this.updatedEmployer);
        const queryParams = {
          employerId: this.employerId
        };
        this.router.navigate(['/employerprofile'],{queryParams});
      },
      (error) => {
        console.error('PUT request error:', error);
      }
    );
  }
  
  
}
