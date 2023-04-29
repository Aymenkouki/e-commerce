import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private _prod : ProductService , private _auth:AuthService , private router:Router) { }

prod:any;
token:any;
cartprod:any[] = [];
favprod:any[] = [];


  ngOnInit(): void {
    
    this._prod.getall()
    .subscribe({
      next:(res)=>{
        this.prod = res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
    

  }

  addcart(id:any){

    this.token = localStorage.getItem("token")!
    
    if(this.token != ''){
      if("cart" in localStorage){
        this.cartprod = JSON.parse(localStorage.getItem("cart")!);        
        let exist = this.cartprod.find(item => item == id)
        if(exist){
          alert ("Product is already in your cart")
        }else{      
          this.cartprod.push(id);
          localStorage.setItem("cart",JSON.stringify(this.cartprod));
             }
      }else{
        this.cartprod.push(id);
        localStorage.setItem("cart",JSON.stringify(this.cartprod));
      }
      window.location.reload();
    }else{
      this.router.navigate(["/login"])
    }
  
    }
    

  addfav(id:any){

    this.token = localStorage.getItem("token")!
    
    if(this.token != ''){
    if("fav" in localStorage){
      this.favprod = JSON.parse(localStorage.getItem("fav")!);
      let exist = this.favprod.find(item => item == id)
      if(!exist){
        this.favprod.push(id);
        localStorage.setItem("fav",JSON.stringify(this.favprod));
        }
    }else{
      this.favprod.push(id);
      localStorage.setItem("fav",JSON.stringify(this.favprod));
    }
    window.location.reload();
  }else{
    this.router.navigate(["/login"])
  }
  }


}
