import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifie',
  templateUrl: './modifie.component.html',
  styleUrls: ['./modifie.component.css']
})
export class ModifieComponent implements OnInit {

  constructor(private _prod:ProductService, public router:Router , private act:ActivatedRoute) { }


  prod : any;
  image : any ;
  id : any;

  ngOnInit(): void {

    this.id=this.act.snapshot.paramMap.get('id');

    this._prod.getbyid(this.id)
    .subscribe({
      next:(res)=>{
        this.prod=res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    
  }

  select(e:any){
    this.image = e.target.files[0]; 
  }


  update(){
    let fd = new FormData();
    fd.append('titre' , this.prod.titre);
    fd.append('prix' , this.prod.prix);
    fd.append('description' , this.prod.description);
    fd.append('categorie' , this.prod.categorie);
    fd.append('stock' , this.prod.stock);
    if(this.image){
    fd.append('image' , this.image);}
      else{
        fd.append('image' , this.prod.image);
      }      
    this._prod.update(this.id, fd)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your product has been updated',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/shop'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
