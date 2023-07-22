import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobseekerdetailsserviceService {
  branch:string='';
baseUrl:string='';
 

  constructor(private http: HttpClient) {
    const start = window.location.href.indexOf('-') + 1;
    const end = window.location.href.indexOf('.project');
    this.branch = window.location.href.substring(start, end);
    this.baseUrl = `https://8080-${this.branch}.project.examly.io`;
  }

  getProfile(jobSeekerId: number): Observable<any> {
    const url = `${this.baseUrl}/jobseekersdetails/job-seekers/${jobSeekerId}`;
    return this.http.get(url);
  }
}
