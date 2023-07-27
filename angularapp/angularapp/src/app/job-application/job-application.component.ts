import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent {
  @Input() jobId: number=0;
  @Input()  jobSeekerId: number=0;
  branch:string='';
  baseURL:string='';
  isAccessedFromAdmin: boolean =false;
  constructor(private http: HttpClient) { 
     
const start = window.location.href.indexOf('-') + 1;
const end = window.location.href.indexOf('.project');
this.branch = window.location.href.substring(start, end);
this.baseURL = `https://8080-${this.branch}.project.examly.io`;
  }
  PersonalInfoFormComponent !: FormGroup;
 
 
   countryList=[
     {"countryname":"India"},
     {"countryname":"USA"},
     {"countryname":"UK"}
   ]
  ngOnInit() {
      
console.log(this.jobSeekerId)
   this.PersonalInfoFormComponent = new FormGroup({
     'jobSeekerId' :new FormControl(this.jobSeekerId),
     'jobId' :new FormControl(this.jobId),
     'firstName': new FormControl(null,[Validators.required]),
     'middleName': new FormControl(null),
     'lastName': new FormControl(null),
     'email': new FormControl(null,[Validators.required, Validators.email]),
     'gender': new FormControl('male'),
     'phone': new FormControl(null),
     'coverLetter': new FormControl(null),
     'date': new FormControl(null),
     'month': new FormControl(null),
     'year':new FormControl(null),
     'country':new FormControl(null),
     'street': new FormControl(null),
     'city': new FormControl(null),
     'state': new FormControl(null),
     'postalCode': new FormControl(null)
     
   });
 }
 successMessage: string = '';
  applyForJob():void
  {
 

   
     const formData = this.PersonalInfoFormComponent.value;
console.log(formData);
     this.http.post(`${this.baseURL}/api/job-applications/apply`, formData, { responseType: 'text' }).subscribe(
       (response: any) => {
         console.log('Job application submitted successfully.');
         this.successMessage = 'Thank You For Applying For The Job';
       },
       (error: any) => {
         console.error('Failed to apply for the job:', error);
         this.successMessage =error.error;
       }
     );
   }
}
