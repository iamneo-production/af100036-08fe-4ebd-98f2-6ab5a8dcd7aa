import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobseekerdetailsserviceService {
  private baseUrl = 'https://8080-becfabfadacaeaebfcaccdadddfabcfbf.project.examly.io'; 

  constructor(private httpCli: HttpClient) { }

  getProfile(jobSeekerId: number): Observable<any> {
    const url = `${this.baseUrl}/details/job-seekers/${jobSeekerId}`;
    return this.httpCli.get(url);
  }
}
