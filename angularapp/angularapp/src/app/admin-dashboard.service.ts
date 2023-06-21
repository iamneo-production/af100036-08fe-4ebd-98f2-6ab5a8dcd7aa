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
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/chart');
  }

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employers');
  }

  getJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job-seekers');
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/${id}`);
  }

  deleteEmployer(id: number): Observable<void> {
    return this.http.delete<void>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employers/${id}`);
  }

  deleteJobSeeker(id: number): Observable<void> {
    return this.http.delete<void>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job-seekers/${id}`);
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/${job.id}`, job);
  }

  updateEmployer(employer: Employer): Observable<Employer> {
    return this.http.put<Employer>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employers/${employer.id}`, employer);
  }

  updateJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.put<JobSeeker>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job-seekers/${jobSeeker.id}`, jobSeeker);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs', job);
  }

  addEmployer(employer: Employer): Observable<Employer> {
    return this.http.post<Employer>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employers', employer);
  }

  addJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.post<JobSeeker>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job-seekers', jobSeeker);
  }

  getAllDeletedJob(): Observable<Job[]> {
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job/deleted');
  }

  getAllDeletedJobSeekers(): Observable<JobSeeker[]> {
    return this.http.get<JobSeeker[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job-seekers/deleted');
  }

  getAllDeletedEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employer/deleted');
  }




  getJobsByEmployer(employerId: number): Observable<Job[] | null> {
    return this.http.get<Job[]>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/employers/${employerId}/jobs`).pipe(
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
  
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/search', { params });
  }

  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());
  
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/sort', { params });
  }

  reportJob(jobId: number): Observable<any> {
    const url = `https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/report/${jobId}`;
    
    return this.http.post(url, {}, { responseType: 'text' });
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/cms/posts');
  }

  updatePost(post: any): Observable<any> {
    const formData: FormData = new FormData();
    if (post.fileToUpload) {
      formData.append('image', post.fileToUpload, post.fileToUpload.name);
    }
    formData.append('title', post.title);
    formData.append('content', post.content);

    const updateUrl = `https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/cms/posts/${post.id}`;
    return this.http.put(updateUrl, formData, { responseType: 'text' });
  }
  getAllFAQs(): Observable<Faq[]> {
    return this.http.get<Faq[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/faq');
  }

  addFAQ(newFaq: Faq): Observable<Faq> {
    return this.http.post<Faq>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/faq/add', newFaq);
  }

  updateFAQ(id: number, updatedFaq: Faq): Observable<Faq> {
    const updatedFaqData = { question: updatedFaq.question, answer: updatedFaq.answer };
    return this.http.put<Faq>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/faq/${id}`, updatedFaqData);
  }

  deleteFAQ(id: number): Observable<void> {
    return this.http.delete<void>(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/faq/${id}`);
  }
  
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/tasks');
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/tasks', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/tasks/${id}`);
  }
}
