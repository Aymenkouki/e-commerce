import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  cont = {
    name: '',
    email:'',
    subject:'',
    message:''
  }

  constructor(private _contact: ContactService, private router: Router) { }

  ngOnInit(): void {    
  }


  envoyer(){
    this._contact.ajout(this.cont)
    .subscribe({
      next: (res)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your message has been sended',
          showConfirmButton: false,
          timer: 10000
        })
        this.router.navigate(['/contact']);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
