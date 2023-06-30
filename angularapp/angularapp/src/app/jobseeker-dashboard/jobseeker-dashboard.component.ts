import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-class';
import { UserService } from '../user.service';
import { Pincodes } from '../pincodes';
import { FormBuilder } from '@angular/forms';
import { jobsApplied } from '../jobs-applied';
import { MatSelect } from '@angular/material/select';

interface Select {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  showTickMark: boolean = false;
  showCrossMarke: boolean = false;
  showTable1: boolean = true;
  showTable2: boolean = false;
  inputValue:string="";
  EnteredpinCode:Pincodes=new Pincodes;
  EnteredPin:string="";
  pincodeArray:Pincodes[]=[];
  myArray:string[]=[];
  jobApplied:jobsApplied[]=[];
  id:number=0;

  products: Product[] = [];
  searchedProducts: Product[]=[];

  element:Product=new Product();


  
  constructor(private router:Router, private userService:UserService, private formBuilder: FormBuilder, private route:ActivatedRoute){}

  select: Select[] = [
    {value: 'Dashboard', viewValue: 'Dashboard_Page'},
    {value: 'Employer', viewValue: 'Employer_Page'},
  ];
 
  
  ngOnInit() 
  {

this.userService.getAllJobsApplied().subscribe(jobsApplied=>{this.jobApplied=jobsApplied},
  (error:any )=> {console.error(error);
  
  })
      

    this.userService.getAllProducts().subscribe(products =>{this.products=products},
      (error: any) => {
        console.error(error);
      })

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

  onSubmit(){

  }

  


    
  

}

