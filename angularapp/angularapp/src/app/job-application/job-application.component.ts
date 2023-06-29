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

  isAccessedFromAdmin: boolean =false;
  constructor(private http: HttpClient) { }
  PersonalInfoFormComponent !: FormGroup;
 
   
   // handleResumeUpload(files: FileList) {
   //   // Handle file upload for the resume field
   //   if (files.length > 0) {
   //     this.personalInfoForm.resume = files[0];
   //     console.log('Resume uploaded:', this.personalInfoForm.resume);
   //   }; [Validators.required, Validators.email]
   // }
 
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
     // 'resume': new FormControl(null),
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
     this.http.post('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/api/job-applications/apply', formData, { responseType: 'text' }).subscribe(
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
