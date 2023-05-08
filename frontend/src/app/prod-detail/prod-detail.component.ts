import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.component.html',
  styleUrls: ['./prod-detail.component.css']
})
export class ProdDetailComponent implements OnInit {

  id:any;
  prod:any;
  produit={
    titre:'',
    prix:0,
    description:'',
    image:''

  }
  token:any;
  cartprod:any[] = [];
  favprod:any[] = [];
  adm='';



  constructor(private _prod:ProductService, private act:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.adm = localStorage.getItem("adm")!;

    this.id=this.act.snapshot.paramMap.get('id');

    this._prod.getbyid(this.id)
    .subscribe({
      next:(res)=>{

        this.prod = res;

        this.produit.titre = this.prod.titre ;
        this.produit.prix = this.prod.prix ;
        this.produit.description = this.prod.description ;
        
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
