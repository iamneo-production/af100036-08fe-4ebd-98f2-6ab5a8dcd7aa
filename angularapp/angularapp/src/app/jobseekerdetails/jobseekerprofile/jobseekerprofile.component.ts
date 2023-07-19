import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerdetailsserviceService } from '../jobseekerdetailsservice.service';

@Component({
  selector: 'app-jobseekerprofile',
  templateUrl: './jobseekerprofile.component.html',
  styleUrls: ['./jobseekerprofile.component.css']
})
export class JobseekerprofileComponent implements OnInit {
  profileinfo: any;
  showJobSeekerUpdateForm: boolean = false;
  isFormVisible: boolean = false;
selectedprofile:any;
  showUpdateJobSeekerForm(): void {
    this.showJobSeekerUpdateForm = true;

    this.isFormVisible = !this.isFormVisible;
  }

  @Input() isAdmin: boolean = true;
  @Input() jobSeekerId: number = 0;

  updateJobSeeker(updatedJobSeeker: any) {
  
    this.profileinfo = updatedJobSeeker;
   
  }

  constructor(private seekerservice: JobseekerdetailsserviceService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.jobSeekerId = params['jobSeekerId'] || 0;
      console.log(this.jobSeekerId);
    });
    this.getProfile();
  }

  getProfile() {
    this.seekerservice.getProfile(this.jobSeekerId).subscribe(
      (response: any) => {
    
        this.profileinfo = response;

        console.log(this.profileinfo);
      },
      (error: any) => {}
    );
  }

  logout() {}
}