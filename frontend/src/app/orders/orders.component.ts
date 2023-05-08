import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { ProductService } from '../service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private _cart : CartService , private _auth : AuthService , private _prod: ProductService) { }

  ord:any;
  cl:any;
  cls:any[] = [];
  nb=0;
  cmd:any;
  cmds:any[] = [];
  quant :number[] = [];
  total = 0;
  nbs=0;
  dd:any;
  stock: any;
  prod:any;
  prods:any[] = [];
  prodid:any[] = [];


  ngOnInit(): void {

    this._cart.getall()
    .subscribe({
      next: (res)=>{

        this.ord = res;         
        
        this.nbs = this.ord.length;
        

        for(let x=0 ; x<this.nbs ; x++){
          this._auth.getbyid(this.ord[x].client)
          .subscribe({
            next: (res)=>{
      
              this.cl = res;  

              this.cls.push(this.cl); 
                
            },
            error: (err)=>{
              console.log(err);
            }
          })

        }
        
        
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }



  searchCmd(x:number){

      this.quant = JSON.parse(this.ord[x].quants);      

      this.nb = JSON.parse(this.ord[x].ids).length; 
  
      for(let i=0 ; i<this.nb ; i++){
        
        this._prod.getbyid(JSON.parse(this.ord[x].ids)[i])
        .subscribe({
          next: (res)=>{
            this.cmd = res;   
            
            this.cmds.push(this.cmd);
            
            this.total=0;

            for(let i = 0 ; i<this.cmds.length ; i++){
              this.total = this.total +(this.cmds[i].prix*this.quant[i]);              
            }
            
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }   

    }

    y='';
    z='';

    details(i:number){
      this.cmds = [];

      this.searchCmd(i);
      this.y = this.cls[i].lastname;
      this.z=this.cls[i].name;

    
    }

    delete(i:number){
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
          
          this._cart.delete(this.ord[i]._id)
          .subscribe({
            next: (res)=>{

              this.quant = JSON.parse(this.ord[i].quants); 
              
              for(let j = 0; j < JSON.parse(this.ord[i].ids).length; j++){
                this._prod.getbyid(JSON.parse(this.ord[i].ids)[j])
                .subscribe({
                  next:(res)=>{

                    this.prod = res;

                    this.prodid.push(this.prod._id);

                  }, error:(err)=>{
                    console.log(err);
                    
                  }
                })
               }


              for(let j = 0; j < JSON.parse(this.ord[i].ids).length; j++){ 

                this._prod.getbyid(JSON.parse(this.ord[i].ids)[j])
                .subscribe({
                  next: (res)=>{
                    this.prod = res;


                
                    this._prod.getbyid(this.prodid[j])
                    .subscribe({
                      next: (res)=>{
                        this.stock=res;
                        
                        this.stock.stock= this.stock.stock + this.quant[j];
                                                                      
                        
                        this._prod.update(this.prodid[j],this.stock)
                        .subscribe({
                          next:(res)=>{
                          
                              console.log(res);
                              
                            
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
                                      
                    
                  },
                  error: (err)=>{
                    console.log(err);
                  }
                })


              }
                      

              Swal.fire({
                title: 'The order has been deleted',
                text: "",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
                
            },
            error: (err)=>{
              console.log(err);
            }
          })

        }
      })

      
    }

  



}
