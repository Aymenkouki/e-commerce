import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-fix-item',
  templateUrl: './fix-item.component.html',
  styleUrls: ['./fix-item.component.css']
})
export class FixItemComponent implements OnInit {

  constructor(private _auth:AuthService , private router:Router) { }

  token:any;
  clientname:any;
  id:any;
  client:any;
  adm='';

  ngOnInit(): void {
    
    this.adm = localStorage.getItem("adm")!;

    this.token = localStorage.getItem('token');
    if(this.token != ''){
      this.clientname = this._auth.getUserDataFromToken().lastname;
      this.id = this._auth.getUserDataFromToken()._id;    
      this._auth.getbyid(this.id)
      .subscribe({
        next:(res)=>{
          this.client = res;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })

    }
    

    

  }

  logout(){

    this.client.chart = localStorage.getItem("cart");
    this.client.favorite = localStorage.getItem("fav");  
      
    this._auth.update(this.id, this.client)
    .subscribe({
      next:(res)=>{
        console.log(this.client);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })



    localStorage.setItem('token','');
    localStorage.setItem('adm','f');
    localStorage.setItem('cart', '[]');
    localStorage.setItem('fav', '[]');

    window.location.reload();


  }

}
