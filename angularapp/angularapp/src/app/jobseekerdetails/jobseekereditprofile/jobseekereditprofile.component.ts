import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobseekereditprofile',
  templateUrl: './jobseekereditprofile.component.html',
  styleUrls: ['./jobseekereditprofile.component.css']
})
export class JobseekereditprofileComponent implements OnInit {
  @Input() jobseekerId: number = 0;
 
  branch:string='';
  baseURL:string='';
   
  

  
  
  updatedjobseeker = {
    name: '',
    skills: [] as string[],
    experience: 0,
    location: '',
    maritalStatus: '',
    hometown: '',
    nationality: '',
    lastJobDesignation: '',
    reasonsForLeaving: '',
    mobile:'',
    email:'',
    gender:''
  };
  
  skillsInput: string = '';
  isFormVisible: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseURL = `https://8080-${this.branch}.project.examly.io`;
  }

  ngOnInit(): void {
   
  }

  @Output() jobseekerUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() isFormVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  upload() {
    const url = `${this.baseURL}/jobseekersdetails/job-seekers/${this.jobseekerId}`;
    const skills: string[] = this.skillsInput.split(',');

    this.updatedjobseeker.skills = skills;
console.log(this.updatedjobseeker);
    this.http.put(url, this.updatedjobseeker).subscribe(
      (response) => {
        this.isFormVisible = false;
        this.isFormVisibleChange.emit(this.isFormVisible);
        this.jobseekerUpdated.emit(this.updatedjobseeker);
      },
      (error) => {
        console.error('PUT request error:', error);
      
      }
    );
  }
}
