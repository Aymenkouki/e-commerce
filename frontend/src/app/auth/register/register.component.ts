import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth : AuthService , private router : Router) { }

  client={
    name: '',
    lastname : '',
    email:'',
    password:'',
    favorite:'[]',
    chart:'[]',
    adm: 'f'
  };


  ngOnInit(): void {
  }

  register(){
    this._auth.register(this.client)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are registred now !!',
          showConfirmButton: false,
          timer: 10000
        })
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }


}
