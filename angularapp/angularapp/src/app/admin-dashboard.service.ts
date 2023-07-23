import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Job } from './Job.module';
import { Employer } from './Employer.module';
import { JobSeeker } from './JobSeeker.module';
import { Faq } from './Faq.module';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  branch: string = '';
  baseURL: string = '';

  constructor(private http: HttpClient) {
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseURL = `https://8080-${this.branch}.project.examly.io/admins`;
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/jobs/chart`);
  }


  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseURL}/employers`);
  }

  getJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>(`${this.baseURL}/job-seekers`);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/jobs/${id}`);
  }

  deleteEmployer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/employers/${id}`);
  }

  deleteJobSeeker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/job-seekers/${id}`);
  }


  updateJob(job: any): Observable<any> {
    console.log(job);
    return this.http.put<any>(`${this.baseURL}/jobs/${job.id}`, job);
  }

  updateEmployer(employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`${this.baseURL}/employers/${employer.id}`, employer);
  }

  updateJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.put<JobSeeker>(`${this.baseURL}/job-seekers/${jobSeeker.id}`, jobSeeker);
  }

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


  getAllDeletedJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>(`${this.baseURL}/job-seekers/deleted`);
  }

  getAllDeletedEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseURL}/employer/deleted`);
  }
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

  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());

    return this.http.get<Job[]>(`${this.baseURL}/jobs/sort`, { params });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/cms/posts`);
  }
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


  getAllFAQs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.baseURL}/faq`);
  }

  addFAQ(newFaq: Faq): Observable<Faq> {
    return this.http.post<Faq>(`${this.baseURL}/faq/add`, newFaq);
  }


  updateFAQ(id: number, updatedFaq: Faq): Observable<Faq> {
    const updatedFaqData = { question: updatedFaq.question, answer: updatedFaq.answer };
    return this.http.put<Faq>(`${this.baseURL}/faq/${id}`, updatedFaqData);
  }

  deleteFAQ(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/faq/${id}`);
  }

  
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/tasks`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/tasks`, task);
  }


  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/tasks/${id}`);
  }

  addPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/cms/upload`, formData, { responseType: 'json' });
  }


  reportJob(jobId: number): Observable<any> {
    const url = `${this.baseURL}/jobs/report/${jobId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }
  getReportedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/reported/employers`);
  }

  getReportedEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseURL}/reported/employers`);
  }

  getReportedJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>(`${this.baseURL}/reported/jobseekers`);
  }
  getJobApplications(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/jobApplications/${jobId}`);
  }
  
  reportJobSeeker(jobSeekerId: number): Observable<any> {
    const url = `${this.baseURL}/job-seekers/report/${jobSeekerId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }
  unreportJob(jobId: number): Observable<any> {
    const url = `${this.baseURL}/jobs/unreport/${jobId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  unreportEmployer(employerId: number): Observable<any> {
    const url = `${this.baseURL}/jobs/unreport/${employerId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  unreportJobSeeker(jobSeekerId: number): Observable<any> {
    const url = `${this.baseURL}/jobseekers/unreport/${jobSeekerId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }
}