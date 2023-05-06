import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartl=0;
  cart:any[] = [];
  prod:any;
  prods:any[] = [];
  quant :number[] = [];
  total =0;
  stock:any;
  Tid : any[] = [];


  ord={
    client:'',
    ids:'',
    quants:''
  }



  constructor(private _prod:ProductService , private _cart:CartService , private router:Router , private _auth:AuthService) { }

  ngOnInit(): void {

    this.cartl = JSON.parse(localStorage.getItem("cart")!).length;
    for(let i = 0; i< this.cartl ; i++){
      this.quant.push(0);
    }
  
    this.cart = JSON.parse(localStorage.getItem("cart")!);
    

    for(let i = 0; i < this.cartl; i++){ 
    this._prod.getbyid(this.cart[i])
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

    let index = this.cart.indexOf(id);
      if(index !==-1){
        this.cart.splice(index,1)
      }
  
      localStorage.setItem("cart",JSON.stringify(this.cart));
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

        localStorage.setItem("cart","[]");
        window.location.reload();

      }
    })
  }

  plus(x:number){
    this.quant[x]++
    this.total = this.total + this.prods[x].prix;
  }

  moin(x:number){
    if(this.quant[x]>0){
      this.quant[x]--;
      this.total = this.total - this.prods[x].prix;
    }
  }

  

  order(){

    for(let i=0; i<this.prods.length; i++){ 
    this.Tid.push(this.prods[i]._id);}

    this.ord.ids = JSON.stringify(this.Tid);
    this.Tid  = [];

    
    this.ord.quants = JSON.stringify(this.quant);
    this.ord.client = this._auth.getUserDataFromToken()._id;  
    

    Swal.fire({
      title: 'You want to order now ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
    
    this._cart.ajout(this.ord)
    .subscribe({
      next: (res)=>{

        for(let i=0; i<this.prods.length; i++){
          this._prod.getbyid(this.prods[i]._id)
          .subscribe({
            next: (res)=>{
              this.stock=res;
              this.stock.stock= this.stock.stock - this.quant[i];              
              
              this._prod.update(this.prods[i]._id,this.stock)
              .subscribe({
                next:(res)=>{
                
                  
                },
                error:(err)=>{
                  console.log(err);
                  
                }
              })
              
            },
            error: (err)=>{
              console.log(err);
              
            }
          })
        }

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You will get your command in 48 hours',
              showConfirmButton: false,
              timer: 10000
            })
    
            localStorage.setItem('cart', '[]');
            window.location.reload();


          },
      error: (err)=>{
        console.log(err);
          }

        })



    }
    })

  }


}
