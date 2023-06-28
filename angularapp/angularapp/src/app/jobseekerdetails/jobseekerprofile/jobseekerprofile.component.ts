import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() jobSeekerId: number = 4;

  updateJobSeeker(updatedJobSeeker: any) {
  
    this.profileinfo = updatedJobSeeker;
   
  }

  constructor(private seekerservice: JobseekerdetailsserviceService, private router: Router) {}

  ngOnInit() {
   
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