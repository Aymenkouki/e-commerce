import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  constructor(private _prod:ProductService, private router:Router) { }

  prod = {
    titre: '',
    prix: '',
    description:'',
    categorie:'',
    stock:'',
  }
  image : any ;

  ngOnInit(): void {
    
  }

  select(e:any){
    this.image = e.target.files[0]; 
  }

  ajout(){
    let fd = new FormData();
    fd.append('titre', this.prod.titre);
    fd.append('prix', this.prod.prix);
    fd.append('description', this.prod.description);
    fd.append('categorie', this.prod.categorie);
    fd.append('stock', this.prod.stock);
    fd.append('image', this.image);

    this._prod.ajout(fd)
    .subscribe({
      next:(res)=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your new product has been saved',
          showConfirmButton: false,
          timer: 3000
        })

        this.router.navigate(['/shop']);

      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
