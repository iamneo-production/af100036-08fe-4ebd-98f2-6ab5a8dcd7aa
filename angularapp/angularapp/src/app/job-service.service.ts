import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './Job.module';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {
  branch:string='';
baseUrl:string='';
 

  constructor(private http: HttpClient) {
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseUrl = `https://8080-${this.branch}.project.examly.io/job-search`;
  }


  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/jobs/chart`);
  }
  getAllDeletedJob(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/job/deleted`);
  }
  searchJobs(title?: string, location?: string): Observable<Job[]> {
    let params = new HttpParams();

    if (title) {
      params = params.set('title', title);
    }

    if (location) {
      params = params.set('location', location);
    }

    return this.http.get<Job[]>(`${this.baseUrl}/jobs/search`, { params });
  }

  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());
    return this.http.get<Job[]>(`${this.baseUrl}/jobs/sort`, { params });
  }

  reportJob(jobId: number): Observable<string> {
    const url = `${this.baseUrl}/report/${jobId}`;
    return this.http.post<string>(url, {});
  }

  getReportedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/reported`);
  }

}
