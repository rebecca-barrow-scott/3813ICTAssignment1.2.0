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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = ""
  password:string = ""
  verify:boolean = false
  feedback:string = " "
  userobj = new UserObj()
  user:any


  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    if(this.user != undefined){
      this.router.navigateByUrl('user');
    }
  }

  public loginFunc(){
    this.userobj.email = this.email
    this.userobj.password = this.password

    this.httpClient.post(BACKEND_URL + '/api/auth', this.userobj, httpOptions)
    .subscribe((data: any) => {
      if (data.valid){
        this.userService.setUser({"username": data.username, "email": data.email, "role": data.role});
        this.router.navigateByUrl('user');
      } else {
        this.feedback = "Sorry, email or password is wrong."
      }
    });
  }
}
