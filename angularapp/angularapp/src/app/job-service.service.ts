import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './Job.module';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {
  private baseUrl = 'http://localhost:8080/admins/jobs';

  constructor(private http: HttpClient) { }
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/jobs/chart');
  }
  getAllDeletedJob(): Observable<Job[]> {
    return this.http.get<Job[]>('https://8080-becfabfadacaeaebfceaeaadbdbabf.project.examly.io/admins/job/deleted');
  }
  searchJobs(title?: string, location?: string): Observable<Job[]> {
    let params = new HttpParams();

    if (title) {
      params = params.set('title', title);
    }

    if (location) {
      params = params.set('location', location);
    }

    return this.http.get<Job[]>(`${this.baseUrl}/search`, { params });
  }

  sortJobs(sortBy: string): Observable<Job[]> {
    const params = new HttpParams().set('sortBy', sortBy.toLowerCase());
    return this.http.get<Job[]>(`${this.baseUrl}/sort`, { params });
  }

  reportJob(jobId: number): Observable<string> {
    const url = `${this.baseUrl}/report/${jobId}`;
    return this.http.post<string>(url, {});
  }

  getReportedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/reported`);
  }

}
