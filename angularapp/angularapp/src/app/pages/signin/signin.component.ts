import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.http.post<any>('http://localhost:8080/api/signin', user).subscribe(response => {
        if (response && response.role === 'JOB_SEEKER') {
          const queryParams = {
            response: JSON.stringify(response.jobseekerid)
          };
          console.log('Signin Successful');
          this.router.navigate(['/joba'], { queryParams });
        } else if (response && response.role === 'EMPLOYER') {
          const queryParams = {
            response: JSON.stringify(response.employerid)
          };
          console.log('Signin Successful');
          this.router.navigate(['/dash'], { queryParams });
        } else {
          console.log('Invalid credentials');
        }
      },

      error => {
        
      // Handle error response from the backend
      if (error.status === 401) {
        // Validation error occurred
        console.log('Invalid Credentials');
        // Display the validation errors to the user
      } else {
        // Other error occurred
        console.error('Signin failed:', error.message);
        
      }


      }

      );
    }
  }
}

