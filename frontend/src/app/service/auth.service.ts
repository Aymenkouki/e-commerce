import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ) { }

  url = 'http://127.0.0.1:3000/client/';


  register(cl:any){
    return this.http.post(this.url + 'register', cl);
  }

  login(cl:any){
    return this.http.post(this.url + 'login', cl);
  }

  update(id:any, cl:any){
    return this.http.put(this.url + 'update/' + id , cl)
  }

  getbyid(id:any){
    return this.http.get(this.url + 'getbyid/' + id)
  }

  getUserDataFromToken(){
    let token = localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]))
      return data;
    }
  }


}
