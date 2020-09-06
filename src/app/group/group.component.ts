import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserGroupObj } from '../class/usergroupobj';
const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  id:any;
  userGroupObj = new UserGroupObj()
  feedback:string;
  username:string;
  channel_array:any;
  channel:any = [];
  constructor(private router:Router, private httpClient:HttpClient, private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = {"id": this.route.snapshot.params.id};
    this.httpClient.post(BACKEND_URL + '/getChannel', this.id, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        this.channel_array = data.channels;
        this.channel_array.unshift({"id": "0", "name": "All"});
      } else {
        this.feedback = data.feedback;
      }
    });

  }
  searchUser(){
    if(this.channel = []){
      this.channel = {"id": "0", "name": "All"};
    }
    this.userGroupObj.username = this.username
    this.userGroupObj.group_id = this.id
    this.userGroupObj.channels = this.channel
    this.httpClient.post(BACKEND_URL + '/searchUser', this.userGroupObj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        window.location.reload();
      } else {
        if(data.feedback == "User doesn't exist"){
          if(confirm("User doesn't exist \n Would you like to create a new one?")){
            var email = prompt("Please enter an email", this.username + "@gmail");
          } else {
            this.feedback = data.feedback
          }
        }
      }
    });
  }

}
