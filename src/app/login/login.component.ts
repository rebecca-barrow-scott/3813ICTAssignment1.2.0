import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserPwd } from '../class/userpwd';
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
  feedback:string = " "
  userpwd = new UserPwd()


  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }
  
  ngOnInit(): void {
  }

  public loginFunc(){
    this.userpwd.email = this.email
    this.userpwd.password = this.password

    this.httpClient.post(BACKEND_URL + '/api/auth', this.userpwd, httpOptions)
    .subscribe((data: any) => {
      if (data.valid){
        this.userService.setUser({"username": data.username, "birthdate": data.birthdate, "age": data.age, "email": data.email});
        this.router.navigateByUrl('user');
      } else {
        this.feedback = "Sorry, email or password is wrong."
      }
    });
  }
}
