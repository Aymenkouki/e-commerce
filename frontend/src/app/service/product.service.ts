import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://127.0.0.1:3000/product/';

  constructor(private http : HttpClient) { }


  ajout(prod:any){
    return this.http.post(this.url + 'ajout', prod);
  }

  delete(id:any){
    return this.http.delete(this.url + 'supprimer/' + id);
  }

  getall(){
    return this.http.get(this.url + 'getall');
  }

  getbyid(id:any){
    return this.http.get(this.url + 'getbyid/' + id);
  }

  getbycategorie(cat:any){
    return this.http.get(this.url + 'getbycategorie/' + cat);
  }

  update(id:any, newprod:any){
    return this.http.put(this.url + 'update/' + id , newprod);
  }


}
