import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/Employer.module';

@Component({
  selector: 'app-editemployer-profile',
  templateUrl: './editemployer-profile.component.html',
  styleUrls: ['./editemployer-profile.component.css']
})
export class EditemployerProfileComponent implements OnInit{
  @Input() employerId: number = 0;
  updatedEmployer:any={};
  @Output() employerUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
   this.upload();
  }
  upload() {
    const url = `http://localhost:8080/admins/employers/${this.employerId}`;
    this.http.put<Employer>(url, this.updatedEmployer).subscribe(
      (response) => {

        this.employerUpdated.emit(this.updatedEmployer);
      },
      (error) => {
        console.error('PUT request error:', error);
      }
    );
  }
  
  
}
