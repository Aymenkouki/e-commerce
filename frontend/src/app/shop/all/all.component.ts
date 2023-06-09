import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

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
adm='';


  ngOnInit(): void {

    this.adm = localStorage.getItem("adm")!;
    
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


  delete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._prod.delete(id)
        .subscribe({
          next:(res)=>{
            window.location.reload();
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
        
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


  page : number = 1;
  tableSize:number = 4 ;
  count: number = 0 ;
  ontabledatachange(event:any){
      this.page=event;
  }


  tablesizes = [4 , 8 , 12 , 16];
  ontablesizechange(event:any){
    this.tableSize = event.target.value;
    this.page=1;
  }

}
