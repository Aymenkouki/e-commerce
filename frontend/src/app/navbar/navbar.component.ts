import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth : AuthService) { }




  cart=0;
  fav=0;


  ngOnInit(): void {

    this.cart = JSON.parse(localStorage.getItem("cart")!).length;

    this.fav = JSON.parse(localStorage.getItem("fav")!).length;
    

  }

}
