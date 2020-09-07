import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { UserGroupObj } from '../class/usergroupobj';
import { UserObj } from '../class/userobj';
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
  username:string = "John";
  channel_array:any;
  channel:any;
  userobj = new UserObj();
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
    this.userGroupObj.username = this.username
    this.userGroupObj.group_id = this.id
    if(this.channel == "All"){
      this.channel_array.splice(0, 1)
      this.userGroupObj.channels = this.channel_array
    } else {
      this.userGroupObj.channels = this.channel
    }
    this.httpClient.post(BACKEND_URL + '/searchUser', this.userGroupObj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == "User exists"){
        this.addToChannel()
        // window.location.reload();
      } else if(data.feedback == "User doesn't exist"){
          if(confirm("User doesn't exist \nWould you like to create a new one?")){
            var email = prompt("Please enter an email", this.username + "@gmail.com");
            this.createUser(email);
          } else {
            this.feedback = data.feedback
          }
      } else {
        this.feedback = data.feedback
      }
    });
  }
  createUser(email){
    this.userobj.username = this.username
    this.userobj.email = email
    this.userobj.role = 'User'
    this.userobj.password = '123'
    this.userobj.confirm_password = '123'
    this.httpClient.post(BACKEND_URL + '/createUser', this.userobj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
        this.addToChannel();
      } else {
        this.feedback = data.feedback
      }
    });
  }


  //need to fix checking againts 'Channel 1.1', 'All' works
  addToChannel(){
    this.httpClient.post(BACKEND_URL + '/addUserChannel', this.userGroupObj, httpOptions)
    .subscribe((data: any) => {
      if (data.feedback == null){
          window.location.reload();
      } else{
        this.feedback = data.feedback
      }
    });
  }
}
