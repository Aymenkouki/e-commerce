import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private _cont : ContactService) { }

  msg:any;
  nb=0;

  ngOnInit(): void {

    this._cont.getall()
    .subscribe({
      next: (res)=>{

        this.msg = res;
        this.nb = this.msg.length;

      },
      error: (err)=>{
        console.log(err);
      }
    })


  }

  delete(id:any){
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

        this._cont.delete(id)
        .subscribe({
          next: (res)=>{
    
            Swal.fire(
              'Deleted!',
              'The message has been deleted.',
              'success'
            )

            this.ngOnInit();
            
          },
          error: (err)=>{
            console.log(err);
          }
        })
    

        

      }
    })
  }

  mssgg:any;
  subject='';
  email='';

  answer(id:any){    

    this._cont.getbyid(id)
    .subscribe({
      next: (res)=>{
        this.mssgg = res;
        this.subject = this.mssgg.subject;
        this.email = this.mssgg.email;
      },
      error: (err)=>{
        console.log(err);
      }
    })

    
  }

}
