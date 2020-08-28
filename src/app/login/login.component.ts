import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { NgForm } from '@angular/forms';
import { UserPwd } from '../class/userpwd';
import { UserObj } from '../class/userobj';
// import { USERPWD } from '../mock-users';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = ""
  password:string = ""
  verify:boolean = false
  feedback:string = ""
  user:UserObj = {username: "User1", birthdate: "01/01/1990", age: 30, email: "user1@gmail.com", password: "123", valid: false}
  userpwd = new UserPwd()


  constructor(private router:Router, private httpClient:HttpClient) { }
  
  ngOnInit(): void {
  }

  public loginFunc(){
    this.userpwd.email = this.email
    this.userpwd.password = this.password

    this.httpClient.post(BACKEND_URL + '/api/auth', this.userpwd, httpOptions)
    .subscribe((data: any) => {
      if (data.valid){
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('age', data.age);
        sessionStorage.setItem('email', data.email);
        this.router.navigateByUrl('user');
      } else {
        alert('Sorry, email or password is wrong')
      }
    });
  }
}
