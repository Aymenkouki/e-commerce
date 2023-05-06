import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://127.0.0.1:3000/cart/';


  constructor(private http:HttpClient) { }

  ajout(cart:any){
    return this.http.post(this.url + 'ajout', cart);
  }

  getall(){
    return this.http.get(this.url + 'getall');
  }

  delete(id:any){
    return this.http.delete(this.url + 'supprimer/' + id);
  }

}
