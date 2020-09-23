import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserObj } from '../class/userobj';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user:any
  username:string
  email:string
  role:string
  password:string
  confirm_password:string
  feedback:string
  userobj = new UserObj();
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user == undefined){
      this.router.navigateByUrl('/');
    }
    if(this.user.role != 'Super Admin' && this.user.role != 'Group Admin'){
      this.router.navigateByUrl('user');
    }
  }
  createUser(){
    this.userobj.username = this.username
    this.userobj.email = this.email
    this.userobj.role = this.role
    this.userobj.password = this.password
    this.userobj.confirm_password = this.confirm_password

    this.userService.validateUser(this.userobj).subscribe((data)=>{
      if (data.feedback == null){
        this.userService.createUser(this.userobj).subscribe((data)=>{
          if(data.feedback == null){
            this.router.navigateByUrl('allUser');
          } else {
            this.feedback = data.feedback;
          }
        });
      } else {
        this.feedback = data.feedback;
      }
    });
  }
}
