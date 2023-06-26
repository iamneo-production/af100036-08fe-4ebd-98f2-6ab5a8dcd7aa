import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editemployer-profile',
  templateUrl: './editemployer-profile.component.html',
  styleUrls: ['./editemployer-profile.component.css']
})
export class EditemployerProfileComponent {
  user: any={};
  @Input() employeeId: number=3;
  
  constructor(private http: HttpClient) { }
  
  updateUser(): void {
    const url = `https://8080-dfafedbbfdeabadfadacaeaebfceaeaadbdbabf.project.examly.io//employer/${this.employeeId}`;
    this.http.put(url, this.user)
      .subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
      });
  }
  
}
