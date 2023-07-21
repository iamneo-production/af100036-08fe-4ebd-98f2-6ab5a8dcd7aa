import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Job } from './Job.module';
import{Employer} from './Employer.module'
import { JobSeeker } from './JobSeeker.module';
import { Faq } from './Faq.module';



@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  branch:string='';
baseURL:string='';
 

  constructor(private http: HttpClient) {
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseURL = `https://8080-${this.branch}.project.examly.io/admins`;
  }

  // Jobs
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/jobs/chart`);
  }

  // Employers
  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseURL}/employers`);
  }

  // Job Seekers
  getJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>(`${this.baseURL}/job-seekers`);
  }

  // Deletion APIs
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/jobs/${id}`);
  }

  deleteEmployer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/employers/${id}`);
  }

  deleteJobSeeker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/job-seekers/${id}`);
  }

  // Update APIs
  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseURL}/jobs/${job.id}`, job);
  }

  updateEmployer(employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`${this.baseURL}/employers/${employer.id}`, employer);
  }

  updateJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.put<JobSeeker>(`${this.baseURL}/job-seekers/${jobSeeker.id}`, jobSeeker);
  }

  // Create APIs
  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.baseURL}/jobs`, job);
  }

  addEmployer(employer: Employer): Observable<Employer> {
    return this.http.post<Employer>(`${this.baseURL}/employers`, employer);
  }

  addJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.post<JobSeeker>(`${this.baseURL}/job-seekers`, jobSeeker);
  }

  getAllDeletedJob(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/job/deleted`);
  }

  // Get all deleted job seekers
  getAllDeletedJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>(`${this.baseURL}/job-seekers/deleted`);
  }

  // Get all deleted employers
  getAllDeletedEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseURL}/employer/deleted`);
  }

  // Get jobs by employer
  getJobsByEmployer(employerId: number): Observable<Job[] | null> {
    return this.http
      .get<Job[]>(`${this.baseURL}/employers/${employerId}/jobs`)
      .pipe(
        map((jobs: Job[]) => {
          if (jobs.length !== 0) {
            return jobs;
          } else {
            return null;
          }
        })
      );
  }

  // Search jobs
  searchJobs(title?: string, location?: string): Observable<Job[]> {
    let params = new HttpParams();

    if (title && location) {
      params = params.append('title', title);
      params = params.append('location', location);
    } else if (title) {
      params = params.append('title', title);
    } else if (location) {
      params = params.append('location', location);
    }

    return this.http.get<Job[]>(`${this.baseURL}/jobs/search`, { params });
  }

  // Sort jobs
  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());

    return this.http.get<Job[]>(`${this.baseURL}/jobs/sort`, { params });
  }

  // Report job
  reportJob(jobId: number): Observable<any> {
    const url = `${this.baseURL}/jobs/report/${jobId}`;

    return this.http.post(url, {}, { responseType: 'text' });
  }

  // Get posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/cms/posts`);
  }

  // Update post
  updatePost(post: any): Observable<any> {
    const formData: FormData = new FormData();
    if (post.fileToUpload) {
      formData.append('image', post.fileToUpload, post.fileToUpload.name);
    }
    formData.append('title', post.title);
    formData.append('content', post.content);

    const updateUrl = `${this.baseURL}/cms/posts/${post.id}`;
    return this.http.put(updateUrl, formData, { responseType: 'text' });
  }

  // Get all FAQs
  getAllFAQs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.baseURL}/faq`);
  }

  // Add FAQ
  addFAQ(newFaq: Faq): Observable<Faq> {
    return this.http.post<Faq>(`${this.baseURL}/faq/add`, newFaq);
  }

  // Update FAQ
  updateFAQ(id: number, updatedFaq: Faq): Observable<Faq> {
    const updatedFaqData = { question: updatedFaq.question, answer: updatedFaq.answer };
    return this.http.put<Faq>(`${this.baseURL}/faq/${id}`, updatedFaqData);
  }

  // Delete FAQ
  deleteFAQ(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/faq/${id}`);
  }

  // Get all tasks
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/tasks`);
  }

  // Create task
  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/tasks`, task);
  }

  // Delete task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/tasks/${id}`);
  }
}

