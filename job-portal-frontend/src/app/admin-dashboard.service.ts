import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.module';
import { Employer } from './employers.module';
import { JobSeeker } from './JobSeekers.module';



@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) {}
  getJobsByEmployer(employerId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`http://localhost:8080/admins/employers/${employerId}/jobs`);
  }
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8080/admins/jobs');
  }

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>('http://localhost:8080/admins/employers');
  }

  getJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>('http://localhost:8080/admins/job-seekers');
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/admins/jobs/${id}`);
  }

  deleteEmployer(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/admins/employers/${id}`);
  }

  deleteJobSeeker(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/admins/job-seekers/${id}`);
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`http://localhost:8080/admins/jobs/${job.id}`, job);
  }

  updateEmployer(employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`http://localhost:8080/admins/employers/${employer.id}`, employer);
  }

  updateJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.put<JobSeeker>(`http://localhost:8080/admins/job-seekers/${jobSeeker.id}`, jobSeeker);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>('http://localhost:8080/admins/jobs', job);
  }

  addEmployer(employer: Employer): Observable<Employer> {
    return this.http.post<Employer>('http://localhost:8080/admins/employers', employer);
  }

  addJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.post<JobSeeker>('http://localhost:8080/admins/job-seekers', jobSeeker);
  }

  getAllDeletedJob(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8080/admins/job/deleted');
  }

  getAllDeletedJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>('http://localhost:8080/admins/job-seekers/deleted');
  }

  getAllDeletedEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>('http://localhost:8080/admins/employer/deleted');
  }
}
