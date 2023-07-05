import { Component, OnInit } from '@angular/core';
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

  


    
  


