import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  favl=0;
  fav:any[] = [];
  prod:any;
  prods:any[] = [];
  quant :number[] = [];
  token:any;
  cartprod:any[] = [];



  constructor(private _prod:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.favl = JSON.parse(localStorage.getItem("fav")!).length;
    for(let i = 0; i< this.favl ; i++){
      this.quant.push(0);
    }
  
    this.fav = JSON.parse(localStorage.getItem("fav")!);
    

    for(let i = 0; i < this.favl; i++){ 
    this._prod.getbyid(this.fav[i])
    .subscribe({
      next: (res)=>{
        this.prod = res;
        this.prods.push(this.prod);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  
          }


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

    let index = this.fav.indexOf(id);
      if(index !==-1){
        this.fav.splice(index,1)
      }
  
      localStorage.setItem("fav",JSON.stringify(this.fav));
      window.location.reload();}}
    )


  }

  clear(){
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

        localStorage.setItem("fav","[]");
        window.location.reload();

      }
    })
  }

  ADD(id:any){
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


}
