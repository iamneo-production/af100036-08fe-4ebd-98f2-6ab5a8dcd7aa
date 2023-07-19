import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent  implements OnInit {
  @Input() jobId: number = 0;
  @Input() jobSeekerId: number =0;
  job: any;
  selectedJobId: number = 0; 
  showApplyForm: boolean = false; 
  showJobDetails: boolean = true; 

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
 
      this.getJobDetails();
   
  }

  applyForJob(jobId: number): void {
    this.selectedJobId = jobId;
    this.showApplyForm = true;
    this.showJobDetails = false;
  }

  getJobDetails() {
    this.http.get(`https://8080-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io/job-details/jobs/${this.jobId}`)
      .subscribe(
        (response: any) => {
          this.job = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}