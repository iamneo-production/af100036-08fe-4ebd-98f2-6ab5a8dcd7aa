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

  constructor(private http: HttpClient) {}
 
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:8080/admins/jobs/chart');
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




  getJobsByEmployer(employerId: number): Observable<Job[] | null> {
    return this.http.get<Job[]>(`http://localhost:8080/admins/employers/${employerId}/jobs`).pipe(
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
  
    return this.http.get<Job[]>('http://localhost:8080/admins/jobs/search', { params });
  }

  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());
  
    return this.http.get<Job[]>('http://localhost:8080/admins/jobs/sort', { params });
  }

  reportJob(jobId: number): Observable<any> {
    const url = `http://localhost:8080/admins/jobs/report/${jobId}`;
    
    return this.http.post(url, {}, { responseType: 'text' });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/admins/cms/posts');
  }

  updatePost(post: any): Observable<any> {
    const formData: FormData = new FormData();
    if (post.fileToUpload) {
      formData.append('image', post.fileToUpload, post.fileToUpload.name);
    }
    formData.append('title', post.title);
    formData.append('content', post.content);

    const updateUrl = `http://localhost:8080/admins/cms/posts/${post.id}`;
    return this.http.put(updateUrl, formData, { responseType: 'text' });
  }
  getAllFAQs(): Observable<Faq[]> {
    return this.http.get<Faq[]>('http://localhost:8080/admins/faq');
  }

  addFAQ(newFaq: Faq): Observable<Faq> {
    return this.http.post<Faq>('http://localhost:8080/admins/faq/add', newFaq);
  }

  updateFAQ(id: number, updatedFaq: Faq): Observable<Faq> {
    const updatedFaqData = { question: updatedFaq.question, answer: updatedFaq.answer };
    return this.http.put<Faq>(`http://localhost:8080/admins/faq/${id}`, updatedFaqData);
  }

  deleteFAQ(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/admins/faq/${id}`);
  }
  
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/admins/tasks');
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/admins/tasks', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/admins/tasks/${id}`);
  }
}
