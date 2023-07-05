import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

import { ActivatedRoute, Router } from '@angular/router';


import { Employer } from '../Employer.module';
import { AdminDashboardService } from '../admin-dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Job } from '../Job.module';


@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit{
  
  queryParams:any;
  
  showApplications: boolean = false;
  employer:any;
employerId:number=0;
  constructor(private http: HttpClient,private route: ActivatedRoute) {
    
  }
  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      if (params['response']) {
        this.queryParams = JSON.parse(params['response']);
           this.employerId=   this.queryParams;        ;
        console.log(this.employerId);
      } else {
        console.log("Response parameter is missing.");
      }
    });
    this.getJobsByEmployer();
  
  }
  selectedEmployer: Employer | null = null;

  selectEmployer(employer: Employer): void {
    this.selectedEmployer = employer;
  }
 
  jobApplications:any=[];
  employers:Employer[]=[];
  showJobs:boolean=false;
  jobs:any=[];
  jobId:number=0;
  selectApplicant(applicationId: number) {
    this.http.post('https://8080-adbbfbaafadacaeaebfcaccdadddfabcfbf.project.examly.io/dashboard/selectApplicant', applicationId, { responseType: 'text' })
        .subscribe(
          (response: string) => {
            
            console.log(response);
          },
          (error) => {
          
            console.error(error);
          }
        );
    }
  

  getApplications(jobId: number): void {
  
    this.http.get<any[]>(`https://8080-adbbfbaafadacaeaebfcaccdadddfabcfbf.project.examly.io/dashboard/jobApplications/${jobId}`).subscribe(
      data => {
        this.jobApplications = data;
        this.showApplications=true;
      },
      error => {
        this.showApplications=true;
        console.log(error);
      }
    );
  }
  
   
    
    getJobsByEmployer() {

      this.http.get<Job[]>(`https://8080-adbbfbaafadacaeaebfcaccdadddfabcfbf.project.examly.io/dashboard/employers/${this.employerId}/jobs`).subscribe(
        (jobs: Job[]) => {
          if (jobs.length !== 0) {
            this.jobs = jobs;
            console.log(jobs);
          } else {
            this.jobs = [];
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    currentApplicationIndex: number = 0; 

    moveToNextApplication(): void {
      if (this.currentApplicationIndex < this.jobApplications.length - 1) {
        this.currentApplicationIndex++;
      }
    }
    moveToPreviousApplication(): void {
      if (this.currentApplicationIndex > 0) {
        this.currentApplicationIndex--;
      }
    }
    
  reportJobSeeker(jobSeekerId: number) {
    const endpoint = `https://8080-adbbfbaafadacaeaebfcaccdadddfabcfbf.project.examly.io/dashboard/job-seekers/report/${jobSeekerId}`;

    this.http.post(endpoint, {}, { responseType: 'text' }).subscribe(
      () => {
        console.log('Job seeker reported successfully');
       
      },
      (error) => {
        console.error('Error reporting job seeker:', error);
      
      }
    );
  }
  }
=======
import { Pincodes } from '../pincodes';
import { jobsApplied } from '../jobs-applied';
import { Product } from '../product-class';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Shortlist } from '../shortlist-class';


@Component({
  selector: 'app-employer-page',
  templateUrl: './employer-page.component.html',
  styleUrls: ['./employer-page.component.css']
})
export class EmployerPageComponent implements OnInit{
  showTickMark: boolean = false;
  showCrossMarke: boolean = false;
  showTable1: boolean = true;
  showTable2: boolean = false;
  inputValue:string="";
  poster:Product=new Product();

  posterForm!: FormGroup;

  myArray:string[]=[];
  jobApplied:jobsApplied[]=[];
  id:number=0;
  shortlisted:jobsApplied[]=[];
  shortlist:Shortlist[]=[];

  products: Product[] = [];
  searchedProducts: Product[]=[];

  element:Product=new Product();
  
  
  constructor(private location:Location, private router:Router, private userService:UserService, private formBuilder: FormBuilder, private route:ActivatedRoute){}

  ngOnInit() 
  {

  this.userService.getAllJobsApplied().subscribe(jobsApplied=>{this.jobApplied=jobsApplied},
  (error:any )=> {console.error(error);
  
  })

  console.log(this.jobApplied)
      

    this.userService.getAllProducts().subscribe(products =>{this.products=products},
      (error: any) => {
        console.error(error);
      })


      this.posterForm = this.formBuilder.group({
        jobTitle: ['', Validators.required],
        company: ['', Validators.required],
        jobLocation: ['', Validators.required],
        shift: ['', Validators.required],
        skills: ['', Validators.required],
        description: ['', Validators.required]
      });

      this.userService.getAllShortlisted().subscribe(shortlisted =>{this.shortlisted=shortlisted},
        (error: any) => {
          console.error(error);
        })

      
    
  }

  getAppliedJobById(id: number): void {
    this.userService.getAppliedJobById(id).subscribe(
      (appliedJob: jobsApplied) => {
        this.shortlisted = [appliedJob]; // Wrap the object in an array
        console.log('applied job:', this.shortlisted);
      },
      (error) => {
        console.log(error);
      }
    );
  }


 



  GoToLoginPage()
  {
    this.router.navigate([""]);
  }

  redirectToUserPage()
  {
    this.router.navigate(['/userPage']);
    alert("Method executed")
  }

  redirectToAdminPage()
  {
    this.router.navigate(["/adminPage"]);
  }


  toggleTables() {
    console.log("input value = ",this.inputValue)
    

    const filteredArray = this.products.filter(item =>
      item.company.toLowerCase().includes(this.inputValue.toLowerCase()) ||
      item.jobLocation.toLowerCase().includes(this.inputValue.toLowerCase()) ||
      item.productName.toLowerCase().includes(this.inputValue.toLowerCase()) ||
      item.brand.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    if (filteredArray.length === 0) {
      console.log('Item not found');
    } else {
      // Print the filtered array
      console.log('filtered array : ',filteredArray);
      this.searchedProducts=filteredArray;
    }
   
    this.showTable1 = false;
    this.showTable2 = true;
   


  }



  GoToHomePage(id:number){

this.router.navigate(['homePage',id]);

  }

  onSubmit() {
    this.userService.createProducts(this.poster).subscribe(
      (createdProducts: Product) => {
        console.log('Job posted:', createdProducts);
        
      },
      (error: any) => {
        console.error('Error posting job :', error);
        
      }
    );

    window.location.reload();
  }

  submitForm(){
    console.log('submitted')
  }

  
  removeJob(id: number): void {
      this.userService.deleteJob(id).subscribe(
        () => {
          console.log('Job deleted successfully');
          // Perform any additional actions after successful deletion
        },
        (error) => {
          console.error('Error deleting job:', error);
          // Handle error scenarios
        }
      );

     
      window.location.reload();
    }


    removeAppliedJob(id: number): void {
      this.userService.deleteAppliedJob(id).subscribe(
        () => {
          console.log('Job deleted successfully');
          // Perform any additional actions after successful deletion
        },
        (error) => {
          console.error('Error deleting job:', error);
          // Handle error scenarios
        }
      );

     
      window.location.reload();
      window.location.reload();
    }




    GoToShortlistPage(id:number){

      this.router.navigate(['ShortlistPage',id]);

    }

  }

  


    
  


>>>>>>> ef805b1a2678dd0db5de99f0246fe6b8834f9483
