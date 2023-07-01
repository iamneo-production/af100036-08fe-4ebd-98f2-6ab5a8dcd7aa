import { compileClassMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:UserService, private snack:MatSnackBar){

  }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      this.snack.open('Username is required!','OK',{
        duration:3000,

      });
      return;
    }
  


    //addUser from userService
    this.userService.addUser(this.user).subscribe(
      {
        next: (data:any) => { 
          //console.log(data)
          if(data){
            Swal.fire('Success','User is registered','success');
          }
          else{
            this.snack.open('User could not be registered!','',{
              duration:3000,
            });
          }
        },
        error: (error:any) => {
          // alert('error')
          // console.log(err);
          // if(error.error==='Username already exists!'){
          //   this.snack.open('Username already exists','',{
          //     duration:3000,
          //   });
          // }
          // else{
          //   // alert('Eror'+error.error);
          //   this.snack.open('Username already exists','',{
          //     duration:3000,
          //   });
          // }
          this.snack.open('Username already exists!','OK',{
            duration:3000,
          });
        }
      }
    );

  }

}
