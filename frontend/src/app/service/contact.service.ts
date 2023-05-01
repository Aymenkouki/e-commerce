import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = 'http://127.0.0.1:3000/contact/';


  constructor(private http : HttpClient) { }

  ajout(cont:any){
    return this.http.post(this.url + 'ajout', cont);
  }

  delete(id:any){
    return this.http.delete(this.url + 'supprimer/' + id);
  }

  getall(){
    return this.http.get(this.url + 'getall');
  }



}
