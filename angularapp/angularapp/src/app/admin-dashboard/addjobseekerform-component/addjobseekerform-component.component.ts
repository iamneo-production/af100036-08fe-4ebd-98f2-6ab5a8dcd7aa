import { Component, EventEmitter, Output } from '@angular/core';
import { JobSeeker } from 'src/app/JobSeeker.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-addjobseekerform-component',
  templateUrl: './addjobseekerform-component.component.html',
  styleUrls: ['./addjobseekerform-component.component.css']
})
export class AddjobseekerformComponentComponent {

  showJobSeekerForm: boolean = true;
  newJobSeeker: JobSeeker = {
    id: 0,
    name: '',
    skills: [],
    experience: 0,
    location: '',
    jobsApplied: [],
    user: null,
    createdAt: '',
    updatedAt: '',
    deleted: false
  };
  skillsInput: string = '';

  @Output() showsJobSeekerForm = new EventEmitter<void>();

  constructor(private jobSeekerService: AdminDashboardService) {}

  showJobSeekerSection(): void {
    this.showsJobSeekerForm.emit();
  }

  addJobSeeker() {
    const skills: string[] = this.skillsInput.split(',');

    this.newJobSeeker.skills = skills;

    this.jobSeekerService.addJobSeeker(this.newJobSeeker).subscribe(
      (jobSeeker: JobSeeker) => {
        console.log('Job seeker added:', jobSeeker);

        this.newJobSeeker = {
          id: 0,
          name: '',
          skills: [],
          experience: 0,
          location: '',
          jobsApplied: [],
          user: null,
          createdAt: '',
          updatedAt: '',
          deleted: false
        };

        this.showJobSeekerSection();
      },
      (error: any) => {
        console.error('Error adding job seeker:', error);
      }
    );
  }
}
