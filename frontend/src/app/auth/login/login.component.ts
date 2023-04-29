import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  client = {
    email:'',
    password:''
  }

  constructor(private _auth : AuthService , private router:Router){ }


  ngOnInit(): void {
  }

  token:any;
  id:any;
  cl:any;

  login(){
    this._auth.login(this.client)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'WELCOME',
          showConfirmButton: false,
          timer: 10000
        });
        this.token =res;
        localStorage.setItem('token', this.token.token);

        this.id = this._auth.getUserDataFromToken()._id;
        this._auth.getbyid(this.id)
        .subscribe({
          next:(res)=>{

            this.cl = res;

            localStorage.setItem('cart', this.cl.chart);
            localStorage.setItem('fav', this.cl.favorite);
            localStorage.setItem('adm', this.cl.adm);
            window.location.reload();
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })



        
        
    
        

        this.router.navigate(['/shop']);

      

      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'email or password invalid !!',
        });
        this.client = {
          email:'',
          password:''
        }        
      }
    })

  }


}
