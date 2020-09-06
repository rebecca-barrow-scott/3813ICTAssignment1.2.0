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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username:string;
  role:string;
  user:any;
  userobj = new UserObj();
  feedback:string = "";
  group_array:any;
  channel_array:any;
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getUser());
    this.username = this.user.username
    this.role = this.user.role

    //FOR SIDE PANEL
      this.httpClient.post(BACKEND_URL + '/getGroups', this.userobj, httpOptions)
      .subscribe((data: any) => {
        if(data.feedback == null){
          this.group_array = JSON.parse(data.groups);
          this.channel_array = JSON.parse(data.channels);
        } else {
          this.feedback = data.feedback;
        }
      });
  }
  logout(){
    this.userService.logout();
    }
}
